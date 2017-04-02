'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

router.get('/token', (req, res, next) => {
  res.end()
})
router.post('/token', (req, res, next) => {

  let token = jwt.sign(req.body);
  console.log('----', token);
  res.end()
})

module.exports = router;
