---
description: Turn prompt logging on or off, or show its status
argument-hint: on | off | status | dir <path>
allowed-tools: Bash(node:*)
---
Command result (show it to the user exactly as it is, without extra comments):

!`node "${CLAUDE_PLUGIN_ROOT}/scripts/prompt-log.js" $ARGUMENTS`
