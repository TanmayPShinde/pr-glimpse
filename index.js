const { isPresent_exec_cmd } = require("./utils");

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on(["pull_request.opened", "pull_request.reopened"], async (context) => {
    app.log.info(context.payload.pull_request);

    const { commits_url, comments_url } = context.payload.pull_request;

    Promise.all([fetch(commits_url), fetch(comments_url)])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([commits, comments]) => {
        const commitMsgs = commits.map((elem) => elem.commit.message);
        const commentMsgs = comments.map((elem) => elem.body);

        app.log.info(commitMsgs);
        app.log.info(commentMsgs);

        if (isPresent_exec_cmd(commitMsgs) || isPresent_exec_cmd(commentMsgs)) {
          app.log("has work");
        }
      });
  });

  app.on("issues.opened", async (context) => {
    app.log("context");
    app.log.info("context");
    context.log("created");

    const issueComment = context.issue({
      body: "Thanks for opening an issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
};
