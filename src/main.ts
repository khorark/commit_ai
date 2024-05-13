#! /usr/bin/env node

import simpleGit, { GitError, SimpleGit } from "simple-git";
import { promises } from "node:fs";
import { Llama3Response } from "./types";
import commander from "commander";
import { version } from "../package.json";
import path from "node:path";

const appDir = path.join(__dirname, "..");
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
  try {
    await git.status(["--"]);
  } catch (_e) {
    const e = _e as GitError;
    console.log(`${e.name}: ${e.message}`);
    process.exit(1);
  }

  program
    .name("Commit AI")
    .description("AI Commit Generator")
    .version(version)
    .option("-p, --preview", "show preview commit message")
    .option(
      "-a, --amend",
      "replace the tip of the current branch by creating a new commit",
    );
  program.parse(process.argv);

  const options = program.opts();
  const preview = Boolean(options.preview);
  const amend = Boolean(options.amend);

  let diff: string | null = null;

  if (amend) {
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
    promises.readFile(appDir + "/prompt/conventional_commit.tmpl", "utf-8"),
    promises.readFile(appDir + "/prompt/summarize_title.tmpl", "utf-8"),
    promises.readFile(appDir + "/prompt/summarize_file_diff.tmpl", "utf-8"),
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

  if (amend) {
    await git.commit(finalMessageText, undefined, { "--amend": null });
  } else {
    if (!preview) {
      await git.commit(finalMessageText);
    }
  }
}

main();
