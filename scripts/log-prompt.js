#!/usr/bin/env node
// UserPromptSubmit hook: saves the prompt if logging is enabled.
'use strict';

const fs = require('fs');
const path = require('path');
const lib = require('./lib');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  try {
    const cfg = lib.loadConfig();
    if (!cfg.enabled) return;

    const event = JSON.parse(raw);
    if (!event.session_id || typeof event.prompt !== 'string') return;

    const now = new Date();
    const root = lib.expandHome(cfg.dir);
    const sessions = lib.readJson(lib.SESSIONS_FILE, {});

    // One folder per session, named after the time the session was registered.
    let sessionDir = sessions[event.session_id];
    if (!sessionDir || !fs.existsSync(path.join(root, sessionDir))) {
      fs.mkdirSync(root, { recursive: true });
      sessionDir = lib.uniqueName(root, `${lib.datePart(now)}_${lib.timePart(now)}`);
      sessions[event.session_id] = sessionDir;
      lib.writeJson(lib.SESSIONS_FILE, sessions);
    }

    // One file per prompt, named after the time it was submitted.
    const dir = path.join(root, sessionDir);
    fs.mkdirSync(dir, { recursive: true });
    const file = lib.uniqueName(dir, lib.timePart(now), '.md');
    const content = event.prompt.endsWith('\n') ? event.prompt : event.prompt + '\n';
    fs.writeFileSync(path.join(dir, file), content);
  } catch (err) {
    // Never block the prompt because of logging.
    process.stderr.write(`prompt-logger: ${err.message}\n`);
  }
});
