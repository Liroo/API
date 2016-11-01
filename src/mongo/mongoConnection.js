//
// Copyright (c) 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>. All Rights Reserved.
//

const mongoose = require('mongoose');

/*
  Connect to mongodb db and fast log on output fd
*/
mongoose.connect(__DB_URL__);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open on ${__DB_URL__}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose connection closed on ${__DB_URL__}`);
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
