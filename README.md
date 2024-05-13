<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">COMMIT_AI</h1>
</p>
<p align="center">
    <em>Revolutionize commits with AI-powered precision.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/khorark/commit_ai?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/khorark/commit_ai?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/khorark/commit_ai?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/khorark/commit_ai?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)
</details>
<hr>

##  Overview

Commit_ai is an innovative open-source software project designed to enhance version control practices through AI-generated commit messages. By enforcing conventional commit message standards, managing dependencies, and offering streamlined code analysis tools, commit_ai ensures consistent and efficient development workflows. Leveraging TypeScript, ESLint, Prettier, and Commitlint integrations, this project provides value by improving code quality, simplifying collaborative coding processes, and boosting productivity for software development teams.

---

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | The project follows a modular architecture with TypeScript for type safety. It integrates with ESLint, Prettier, and Commitlint for code quality. The main functionality is centered around generating AI-powered commit messages based on staged changes.|
| 🔩 | **Code Quality**  | The codebase maintains a high level of quality with linting rules enforced by ESLint. Prettier ensures consistent code formatting. Commitlint enforces conventional commit messages for version control consistency. TypeScript enhances type safety and maintainability.|
| 📄 | **Documentation** | The project includes good documentation with detailed explanations in the repository contents. Descriptions of configuration files, template files for commit categorization, and the main functionality of AI-powered commit messages are provided.|
| 🔌 | **Integrations**  | Key integrations include simple-git for Git operations, ESLint for code linting, Prettier for code formatting, and Commitlint for conventional commit messages. TypeScript is used for type safety.|
| 🧩 | **Modularity**    | The codebase is well-structured and modular, with clear separation of concerns. Modules like `main.ts` for commit message generation and `types.ts` for data handling maintain clarity and reusability.|
| 🧪 | **Testing**       | Testing frameworks and tools used in the project are not explicitly mentioned in the provided details. Further investigation may be needed to determine the testing approach and tools utilized.|
| ⚡️  | **Performance**   | The efficiency and speed of the AI-powered commit message generation can be evaluated based on the effectiveness of the underlying AI model and the speed of processing staged changes. Resource usage depends on the complexity of the AI model.|
| 🛡️ | **Security**      | Security measures for data protection are not detailed in the provided information. Access control mechanisms for repository and commit data may need to be assessed separately.|
| 📦 | **Dependencies**  | Key dependencies include simple-git, Prettier, Commitlint, TypeScript, ESLint, and other related packages for Git operations, code quality, and TypeScript development.|
| 🚀 | **Scalability**   | The project's scalability to handle increased traffic and load depends on the efficiency of the AI model for generating commit messages and the overall performance of the codebase. Scalability enhancements may involve optimizing the AI model and code execution.|

---

##  Repository Structure

```sh
└── commit_ai/
    ├── commitlint.config.js
    ├── eslint.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── prompt
    │   ├── conventional_commit.tmpl
    │   ├── summarize_file_diff.tmpl
    │   └── summarize_title.tmpl
    ├── src
    │   ├── main.ts
    │   └── types.ts
    └── tsconfig.json
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                    |
| [commitlint.config.js](https://github.com/khorark/commit_ai/blob/master/commitlint.config.js) | Enforces conventional commit messages for consistent version control via the repositorys commitlint configuration file.                                                                                                                                                                                                                                |
| [package.json](https://github.com/khorark/commit_ai/blob/master/package.json)                 | Enables CLI usage through npm by defining commands, dependencies, and build processes. Facilitates project management and version control. Integrates with TypeScript, ESLint, Prettier, and Commitlint for streamlined development workflows.                                                                                                         |
| [eslint.config.mjs](https://github.com/khorark/commit_ai/blob/master/eslint.config.mjs)       | Enables ESLint configurations by merging browser globals, recommended JavaScript rules, and TypeScript ESLint rules, enhancing repository code consistency and quality.                                                                                                                                                                                |
| [package-lock.json](https://github.com/khorark/commit_ai/blob/master/package-lock.json)       | Package-lock.json**This file in the `commit_ai` repository captures all the exact dependency versions installed to ensure consistent builds across different environments. It plays a crucial role in maintaining the reproducibility and stability of the project by locking in the specific package versions used during development and deployment. |
| [tsconfig.json](https://github.com/khorark/commit_ai/blob/master/tsconfig.json)               | Enables TypeScript configuration inheritance for Node.js, facilitating file organization and output directory setup. Enhances module resolution and excludes unnecessary folders. Facilitates seamless TypeScript compilation within the projects structure.                                                                                           |

</details>

<details closed><summary>prompt</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                             |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                                                 |
| [summarize_title.tmpl](https://github.com/khorark/commit_ai/blob/master/prompt/summarize_title.tmpl)         | Summarize the theme of a Pull Request by crafting a concise, high-level title based on the changes made in the files, adhering to imperative tense and the Git commit style guide. This template assists experts in capturing the essence of PR changes in a single specific theme. |
| [conventional_commit.tmpl](https://github.com/khorark/commit_ai/blob/master/prompt/conventional_commit.tmpl) | Analyze code changes** to identify and assign **appropriate labels** based on the nature of commits. Simplifies commit categorization for **efficient tracking and codebase management**. Streamlines labeling process for commit classification.                                   |
| [summarize_file_diff.tmpl](https://github.com/khorark/commit_ai/blob/master/prompt/summarize_file_diff.tmpl) | Summarize file differences in git commits, clarifying added and deleted lines, and providing context for modifications. Aim for readable comments that capture essential changes without repeating content. Enhance understanding for programmers analyzing diffs efficiently.      |

</details>

<details closed><summary>src</summary>

| File                                                                      | Summary                                                                                                                                                                                                                                              |
| ---                                                                       | ---                                                                                                                                                                                                                                                  |
| [main.ts](https://github.com/khorark/commit_ai/blob/master/src/main.ts)   | Generates AI-powered commit messages based on staged changes. Parses and enhances commit content while offering preview and amend options. Facilitates more informative and concise commit messages through artificial intelligence text generation. |
| [types.ts](https://github.com/khorark/commit_ai/blob/master/src/types.ts) | B model. Crucial for maintaining consistency and clarity in handling response data across the project.                                                                                                                                               |

</details>

---

##  Getting Started

**System Requirements:**

* **JSON**: `version x.y.z`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the commit_ai repository:
>
> ```console
> $ git clone https://github.com/khorark/commit_ai
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd commit_ai
> ```
>
> 3. Install the dependencies:
> ```console
> $ > INSERT-INSTALL-COMMANDS
> ```

###  Usage

<h4>From <code>source</code></h4>

> Run commit_ai using the command below:
> ```console
> $ > INSERT-RUN-COMMANDS
> ```

###  Tests

> Run the test suite using the command below:
> ```console
> $ > INSERT-TEST-COMMANDS
> ```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/khorark/commit_ai/issues)**: Submit bugs found or log feature requests for the `commit_ai` project.
- **[Submit Pull Requests](https://github.com/khorark/commit_ai/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/khorark/commit_ai/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/khorark/commit_ai
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/khorark/commit_ai/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=khorark/commit_ai">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-overview)

---
