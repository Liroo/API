const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

/*
      |********|
      |* TODO *|
      |********|

  - gere cache and cookies
  - install and use apiDocs

*/

//FIXME Create full log fs
if (__DEV__) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// request pre-middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (__DEV__) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
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
