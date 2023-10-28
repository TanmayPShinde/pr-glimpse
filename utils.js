const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

const isPresent_exec_cmd = (strings) =>
  strings.some((str) => str.includes("/execute"));

const getCodeDiffInPR = async ({ context, owner, repo, pull_number }) => {
  const { data: diff } = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: {
      format: "diff",
    },
  });

  return diff;
};

module.exports = { isPresent_exec_cmd, getCodeDiffInPR };
