
/*
  Add alias to require (TODO test performance of this module)
*/
const modulePath = require('app-module-path');

modulePath.addPath(__dirname);
modulePath.addPath(__dirname + '/src');

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
