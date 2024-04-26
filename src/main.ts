import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
import { promises } from "node:fs";
import path from "node:path";
import { Llama3Response } from "./types";

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
  const [promptLabel, promptTitle, promptSum] = await Promise.all([
    promises.readFile(__dirname + "/prompt/conventional_commit.tmpl", "utf-8"),
    promises.readFile(__dirname + "/prompt/summarize_title.tmpl", "utf-8"),
    promises.readFile(__dirname + "/prompt/summarize_file_diff.tmpl", "utf-8"),
  ]);

  // const promptLabel = readFileSync(
  //   __dirname + "/prompt/conventional_commit.tmpl",
  //   "utf-8",
  // );
  // const promptTitle = readFileSync(
  //   __dirname + "/prompt/summarize_title.tmpl",
  //   "utf-8",
  // );
  // const promptSum = readFileSync(
  //   __dirname + "/prompt/summarize_file_diff.tmpl",
  //   "utf-8",
  // );
  const diff = await git.diff(["--"]);
  console.log("diff:", diff);
  return;
  // const status = await git.status(['--']);
  // console.log('status', status)

  const [label, title, summary] = await Promise.all([
    getAiText(promptLabel, diff),
    getAiText(promptTitle, diff),
    getAiText(promptSum, diff),
  ]);

  // const label = await getAiText(promptLabel, diff);
  // const title = await getAiText(promptTitle, diff);
  // const summary = await getAiText(promptSum, diff);

  const finalText = `
  ${label}: ${title}

  ${summary}
  `;

  console.log("commit => ", finalText);
}

main();
