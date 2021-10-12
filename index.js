const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const comment = core.getBooleanInput("comment");
  const token = core.getInput("repo-token");
  const octokit = github.getOctokit(token);
  const context = github.context;

  try {
    const { number, body, title, user } = context.payload.pull_request;

    // From https://github.com/electron/clerk/blob/d1b31d84a2e15a47c1766359cd2ac493415a7cc1/src/note-utils.ts#L8
    const notes = /(?:(?:\r?\n)|^)notes:(.+?)(?:(?:\r?\n)|$)/gi.exec(body);

    if (!notes || !notes[1]) {
      // TODO: don't spam comments
      if (comment) {
        await octokit.rest.issues.createComment({
          owner: context.repo.owner,
          repo: context.repo.repo,
          issue_number: number,
          body: `Hello ${user.login}! Please include \`Notes: <details|None>\` In your PR description.\n\nEg. \`Notes: ${title}\` or \`Notes: none\` if you want this change to skip the CHANGELOG.md`,
        });
      }

      core.setFailed(
        "`Notes:` missing in pull request description. Visit https://github.com/kyleshay/CheckNotes/blob/main/README.md#examples-for-good-notes for more information.",
      );
      return;
    }

    console.log(`Notes: ${notes[1].trim()}`);
  } catch (error) {
    core.setFailed(`${token}: ${error.message}`);
  }
}

run();
