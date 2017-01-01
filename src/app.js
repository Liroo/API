//
// Copyright (c) 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>. All Rights Reserved.
//

/**
 * @api {get} /api/
 * @apiVersion 0.0.1
 * @apiName Challenge Me
 * @apiGroup Api
 * @apiDescription Used to check if API is on. Like `ping`. Only possibility to fail of this request is time-out !
 *
 * @apiSuccess {String} app_name Name of the API application
 * @apiSuccess {String} app_version  Version of the API application
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "app_name": "Challenge Me",
 *       "app_version": "1.0.0"
 *     }
 *
 */

const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');

/*
      |********|
      |* TODO *|
      |********|

  - gere cache and cookies
  - load balancing
  - install and use apiDocs
  - log fs, debug module (Should use a log fs on each workers ?) // api
  - script to run server in production mode NODE_ENV (express depend on it) // infra ?
  - use cluster service ? on npm => node-pm / cluster-service // infra-api
  - use a reverse proxy // infra

  Things to think for production/release mode: {
    Set NODE_ENV to “production”
    Ensure your app automatically restarts
    Run your app in a cluster
    Cache request results
    Use a load balancer
    Use a reverse proxy
  } => http://expressjs.com/en/advanced/best-practice-performance.html

*/

/*
  Database configuration
*/
require('mongo/mongoIndex');

//FIXME Create full log fs
if (__DEV__) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// request pre-middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
// should increase perf but we should put this logic in nginx
app.use(compression());
// Session is that really useful ?
app.use(session({
  key: '_session',
  saveUninitialized: true,
  secret: 'coolest_api',
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  maxAge: 7200000,
}));

// Create and use API Router
app.use(require('src/router'));

/*
  API ping
*/
app.get('/api/', (req, res) => {
  res.status(200).json({
    app_name: __APP_NAME__,
    app_version: __VERSION__,
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.data = 'Not Found';
  next(err);
});

// error handler
if (__DEV__) {
  //stacktrace for dev
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: err,
    });
  });
} else {
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {},
    });
  });
}

// if parent module is index.js and not www, run express server
const regex = /^(.*)\/index\.js$/g; //match only */index.js
if (regex.test(module.parent.filename)) {
  app.listen(__PORT__, () => {
    console.log('Hey I\'m listening on port :', __PORT__);
  });
} else {
  module.exports = app;
}
