const { Octokit } = require("@octokit/rest");
const { openai } = require("./config/openai");

const octokit = new Octokit();

const isPresent_exec_cmd = (strings) =>
  strings.some((str) => str?.includes("/execute"));

const getCodeDiffInPR = async ({ owner, repo, pull_number }) => {
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

const getOpenAi_PR_explanation = async (diff) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Clearly explain the focus of this PR in less than 300 characters. Then write "\n\n### Detailed summary\n" followed by all notable changes formatted as a bullet list. Be specific and concise. 
        Here is the code diff: ${diff}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion["choices"][0]["message"]["content"];
};

module.exports = {
  isPresent_exec_cmd,
  getCodeDiffInPR,
  getOpenAi_PR_explanation,
};
