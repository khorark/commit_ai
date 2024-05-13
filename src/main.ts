import simpleGit, { SimpleGit } from "simple-git";
import { promises } from "node:fs";
import { Llama3Response } from "./types";
import commander from "commander";
import { version } from "../package.json";

const program = new commander.Command();

const git: SimpleGit = simpleGit();

async function getAiText(prompt: string, diff: string): Promise<string | null> {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3:8b",
        prompt: prompt + "\n" + diff,
        stream: false,
      }),
    });

    const json = await res.json();
    const response = (json as Llama3Response).response;
    return response;
  } catch (e) {
    console.log("getAiText error: ", e);
    return null;
  }
}

async function main() {
  program.name("Commit AI").description("AI Commit Generator").version(version);

  program
    .command("commit", { isDefault: true })
    .description("Commit AI message")
    .option("-p, --preview", "show preview commit message")
    .option(
      "-a, --amend",
      "replace the tip of the current branch by creating a new commit",
    )
    .action(async (options) => {
      let diff: string | null = null;

      if (options.amend) {
        diff = await git.diff(["HEAD^", "HEAD"]);
      } else {
        diff = await git.diff(["--staged"]);
      }

      if (!diff) {
        console.log(
          "Error: please add your staged changes using git add <files...>",
        );
        process.exit(1);
      }

      const [promptLabel, promptTitle, promptSum] = await Promise.all([
        promises.readFile(
          __dirname + "/prompt/conventional_commit.tmpl",
          "utf-8",
        ),
        promises.readFile(__dirname + "/prompt/summarize_title.tmpl", "utf-8"),
        promises.readFile(
          __dirname + "/prompt/summarize_file_diff.tmpl",
          "utf-8",
        ),
      ]);

      const [label, title, summary] = await Promise.all([
        getAiText(promptLabel, diff),
        getAiText(promptTitle, diff),
        getAiText(promptSum, diff),
      ]);

      const finalMessageText = `
      ${label}: ${title}

      ${summary}
      `;

      console.log(finalMessageText);

      if (options.amend) {
        await git.commit(finalMessageText, undefined, { "--amend": null });
      } else {
        if (!options.preview) {
          await git.commit(finalMessageText);
        }
      }
    });

  program.parse(process.argv);
}

main();
