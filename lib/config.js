//
// Copyright (c) 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>. All Rights Reserved.
//


/*
  Add alias to require (TODO test performance of this module)
*/
const modulePath = require('app-module-path');

modulePath.addPath(__dirname);
modulePath.addPath(__dirname + '/lib');

/*
  set global variable
*/
const parseArgv = require('command-line-args');

try {
  const args = parseArgv([
    { name: 'mode', alias: 'm', type: String, defaultValue: 'dev' },
    { name: 'port', alais: 'p', type: Number, defaultValue: 3000 },
  ]);
  global.__DEV__ = args.mode === 'dev';
  global.__PORT__ = args.port;
} catch (err) {
  console.error(err);
  process.exit(1);
}

/*
  Global defined
*/
global.__VERSION__ = '0.0.1';
global.__DB_URL__ = 'mongodb://localhost:27017/api';
global.__APP_NAME__ = 'Challenge Me';
