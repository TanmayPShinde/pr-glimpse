const {
  isPresent_exec_cmd,
  getCodeDiffInPR,
  getOpenAi_PR_explanation,
} = require("./utils");

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on(["pull_request.opened"], async (context) => {
    const { commits_url, comments_url, title, body } =
      context.payload.pull_request;
    app.log.info("pr opened");

    app.log(context.payload.pull_request);

    // fetched commits and comments on the PR
    Promise.all([fetch(commits_url), fetch(comments_url)])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([commits, comments]) => {
        const commitMsgs = commits.map((elem) => elem.commit.message);
        const commentMsgs = comments.map((elem) => elem.body);
        commentMsgs.push(title, body);

        // checking the mesasges for /execute command
        if (isPresent_exec_cmd(commitMsgs) || isPresent_exec_cmd(commentMsgs)) {
          app.log("has work");

          const {
            number: pull_number,
            base: {
              repo: {
                name: repo,
                owner: { login: owner },
              },
            },
            head: { ref: branch_name },
          } = context.payload.pull_request;

          const codesandboxPreviewUrl = `https://codesandbox.io/s/github/${owner}/${repo}/tree/${branch_name}`;

          // fetching code diff in the PR from Octokit api
          const data = getCodeDiffInPR({ owner, repo, pull_number });
          data
            .then((diff) => {
              // getting description for changes in PR
              const resp = getOpenAi_PR_explanation(diff);
              resp
                .then((data) => {
                  app.log(data);

                  // sending back the response with an added description and preview as a comment
                  const issueComment = context.issue({
                    body:
                      data +
                      `\n### Codesandbox preview link:
- ${codesandboxPreviewUrl}`,
                  });
                  return context.octokit.issues.createComment(issueComment);
                })
                .catch((err) => {
                  app.log(err);
                  throw err;
                });
            })
            .catch((err) => {
              return;
            });
        }
      });
  });

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening an issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
};
