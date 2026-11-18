#!/usr/bin/env node
// /prompt-logger:prompt-log command: on | off | status | dir <path>
'use strict';

const path = require('path');
const lib = require('./lib');

const [action = 'status', ...rest] = process.argv.slice(2);
const cfg = lib.loadConfig();

const summary = () =>
  `Prompt logging: ${cfg.enabled ? 'ON' : 'OFF'}\n` +
  `Folder: ${lib.expandHome(cfg.dir)}`;

switch (action) {
  case 'on':
    cfg.enabled = true;
    lib.saveConfig(cfg);
    console.log(summary());
    break;
  case 'off':
    cfg.enabled = false;
    lib.saveConfig(cfg);
    console.log(summary());
    break;
  case 'status':
    console.log(summary());
    break;
  case 'dir': {
    const target = rest.join(' ').trim();
    if (!target) {
      console.log('Usage: /prompt-logger:prompt-log dir <path>');
      process.exitCode = 1;
      break;
    }
    cfg.dir = path.resolve(lib.expandHome(target));
    lib.saveConfig(cfg);
    console.log(summary());
    break;
  }
  default:
    console.log('Usage: /prompt-logger:prompt-log on | off | status | dir <path>');
    process.exitCode = 1;
}
