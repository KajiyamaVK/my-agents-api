Source: https://jules.google/docs/environment/

# Environment setup

Jules runs each task inside a secure, short-lived virtual machine (VM). This lets it clone your repository, install dependencies, and run tests.

For simple environments, Jules studies your repository to learn how to quickly setup your environment without a provided setup script. Jules will also refer to agents.md or your readme.md file for hints to setup an environment on the fly.

For compex environments, you can provide a **setup script** to be run explicitly that prepare the environment.

## What’s preinstalled?

[Section titled “What’s preinstalled?”](#whats-preinstalled)

Every Jules VM runs Ubuntu Linux and includes many popular developer tools out of the box:

*   Node.js
*   Bun
*   Python
*   Go
*   Java
*   Rust

The latest versions can be seen here:

Environment check output

```
-------- Python --------✅ python3: Python 3.12.11✅ python: Python 3.12.11✅ pip: pip 25.1.1 from /home/jules/.pyenv/versions/3.12.11/lib/python3.12/site-packages/pip (python 3.12)✅ pipx: 1.4.3✅ poetry: Poetry (version 2.1.3)✅ uv: uv 0.7.13✅ black: black, 25.1.0 (compiled: yes)✅ mypy: mypy 1.16.1 (compiled: yes)✅ pytest: pytest 8.4.0✅ ruff: ruff 0.12.0✅ pyenv: available  system  3.10.18  3.12.11 (set by /home/jules/.pyenv/version)
-------- NodeJS --------✅ node: v22.16.0 *  v18.20.8 *  v20.19.2 *  → v22.16.0 *  system *✅ nvm: available✅ npm: 11.4.2✅ yarn: 1.22.22✅ pnpm: 10.12.1✅ eslint: v9.29.0✅ prettier: 3.5.3✅ chromedriver: ChromeDriver 137.0.7151.70  (dfa4dc56b2ahb56eb2a14cad006ea5e68c60d5de-refs/branch-heads/7151@{#1875})
-------- Java --------✅ java: openjdk version "21.0.7" 2025-04-15  OpenJDK Runtime Environment (build 21.0.7+6-Ubuntu-0ubuntu124.04)  OpenJDK 64-Bit Server VM (build 21.0.7+6-Ubuntu-0ubuntu124.04, mixed mode, sharing)✅ maven: Apache Maven 3.9.10 (5f519b97e9448438d878815739f519b2eade0a91d)✅ gradle: Gradle 8.8
-------- Go --------✅ go: go version go1.24.3 linux/amd64
-------- Rust --------✅ rustc: rustc 1.87.0 (17067e9ac 2025-05-09)✅ cargo: cargo 1.87.0 (99624be96 2025-05-06)
-------- C/C++ Compilers --------✅ clang: Ubuntu clang version 18.1.3 (1ubuntu1)✅ gcc: gcc (Ubuntu 13.3.0-6ubuntu2~24.04) 13.3.0✅ cmake: cmake version 3.28.3✅ ninja: 1.11.1✅ conan: Conan version 2.17.0
-------- Docker --------✅ docker: Docker version 28.2.2, build e6534b4✅ docker: Docker Compose version v2.36.2
-------- Other Utilities --------✅ awk: GNU Awk 5.2.1, API 3.2, PMA Avon 8-g1, (GNU MPFR 4.2.1, GNU MP 6.3.0)✅ curl: curl 8.5.0 (x86_64-pc-linux-gnu) libcurl/8.5.0 OpenSSL/3.0.13 zlib/1.3 brotli/1.1.0 zstd/1.5.5 libidn2/2.3.7 libpsl/0.21.2 (+libidn2/2.3.7) libssh/0.10.6/openssl/zlib nghttp2/1.59.0 librtmp/2.3 OpenLDAP/2.6.7✅ git: git version 2.49.0✅ grep: grep (GNU grep) 3.11✅ gzip: gzip 1.12✅ jq: jq-1.7✅ make: GNU Make 4.3✅ rg: ripgrep 14.1.0✅ sed: sed (GNU sed) 4.9✅ tar: tar (GNU tar) 1.35✅ tmux: tmux 3.4✅ yq: yq 0.0.0
```

You can check installed versions by adding commands like `node -v` to your setup script and clicking **Run to Validate**.

To view all preinstalled tools, you can use this command in your setup script and click **Run to Validate**.

```
set +x; . /opt/environment_summary.sh
```

## Add a setup script

[Section titled “Add a setup script”](#add-a-setup-script)

To help Jules install dependencies and run tests:

1.  Click on the repo on the left sidebar (under codebases)
2.  Select Configuration at the top
3.  In the “Initial Setup” window, enter the commands needed to install dependencies and prep your project For example:
    
    Terminal window
    
    ```
    npm installnpm run test
    ```
    

## Test your setup script

[Section titled “Test your setup script”](#test-your-setup-script)

Click **Run and Snapshot** to check that your setup script works. Upon success a snapshot of your environment will be created.

## Environment Snapshots

[Section titled “Environment Snapshots”](#environment-snapshots)

After you click **Run and Snapshot** you environment setup script will be run and you will see the results. Upon success, a snapshot of your environment is taken. This snapshot will be used for future Jules tasks started from this repository. This is especially useful for complex environments with long setup times.

## Validation tips

[Section titled “Validation tips”](#validation-tips)

*   You can check installed versions by adding commands like `node -v` to your setup script and clicking **Run to Validate**.
*   Always include commands to install packages, run linters, or execute tests.
*   Use the validation button to catch errors early.
*   Keep your setup lightweight and fast