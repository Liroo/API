//
// Copyright (c) 2016 by Challenge Me - Pierre Monge <liroo.pierre@gmail.com>. All Rights Reserved.
//

/*
  API Router
*/
const express = require('express');
const router = express.Router();

/*
  API ping
*/
router.get('/api/', (req, res) => {
  res.status(200).json({
    app_name: __APP_NAME__,
    app_version: __VERSION__,
  });
});

module.exports = router;
