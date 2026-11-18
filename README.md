# prompt-logger

A Claude Code plugin that saves the prompts you submit, with a switch to turn logging on and off.

## Output layout

```
<base-folder>/
└── 2026-11-18_14-30-05/        # one folder per session (time the session was registered)
    ├── 14-30-05.md             # one file per prompt (time it was submitted)
    └── 14-32-41.md
```

The default base folder is `~/claude-prompts`.

## Commands

- `/prompt-logger:prompt-log on` — turn logging on
- `/prompt-logger:prompt-log off` — turn logging off
- `/prompt-logger:prompt-log status` — show the current state and folder
- `/prompt-logger:prompt-log dir <path>` — set the base folder (e.g. `/prompt-logger:prompt-log dir ~/Documents/prompts`)

Configuration and the session-to-folder mapping are stored in `~/.claude/prompt-logger/`.

## Installation

For local testing:

```
claude --plugin-dir /path/to/prompt-logger
```

Requires Node.js on the PATH. No external dependencies.
