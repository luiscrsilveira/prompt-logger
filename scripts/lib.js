'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const STATE_DIR = path.join(os.homedir(), '.claude', 'prompt-logger');
const CONFIG_FILE = path.join(STATE_DIR, 'config.json');
const SESSIONS_FILE = path.join(STATE_DIR, 'sessions.json');
const DEFAULT_DIR = path.join(os.homedir(), 'claude-prompts');

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function loadConfig() {
  return { enabled: false, dir: DEFAULT_DIR, ...readJson(CONFIG_FILE, {}) };
}

function saveConfig(cfg) {
  writeJson(CONFIG_FILE, cfg);
}

function expandHome(p) {
  if (p === '~' || p.startsWith('~/')) return path.join(os.homedir(), p.slice(1));
  return p;
}

const pad = (n) => String(n).padStart(2, '0');

// 2026-11-18
function datePart(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// 14-30-05
function timePart(d) {
  return `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

// Returns `base+ext` if it is free in `dir`, otherwise `base_2+ext`, `base_3+ext`...
function uniqueName(dir, base, ext = '') {
  let name = base + ext;
  let i = 2;
  while (fs.existsSync(path.join(dir, name))) {
    name = `${base}_${i++}${ext}`;
  }
  return name;
}

module.exports = {
  SESSIONS_FILE,
  readJson,
  writeJson,
  loadConfig,
  saveConfig,
  expandHome,
  datePart,
  timePart,
  uniqueName,
};
