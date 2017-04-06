'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
const boom = require('boom')
const bodyParser = require('body-parser');

router.get('/favorites', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, "Unauthorized"))
  } else {
    knex('favorites')
      .join('books', 'books.id', 'book_id')
      .then((favs) => {
        res.send(humps.camelizeKeys(favs));
      })
  }
})

router.get('/favorites/check', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, "Unauthorized"))
  } else {
    knex('favorites')
      .where('book_id', req.query.bookId)
      .then((userData) => {
        if (userData.length > 0) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)
        }
      })
  }
})

router.post('/favorites/', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, "Unauthorized"))
  } else {
    knex('favorites')
    .returning(['id', 'book_id', 'user_id'])
    .insert({
      id: 2,
      book_id: req.body.bookId,
      user_id: 1
    })
    .then((userData) => {
      res.send(humps.camelizeKeys(userData[0]));

    })
  }
})

router.delete('/favorites/', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, "Unauthorized"))
  } else {
    knex('favorites').where('book_id', req.body.bookId)
    .then((favs) => {
      let deletedBook = {
        bookId: favs[0].book_id,
        userId: favs[0].user_id
      }
      res.send(deletedBook)
    }).then(knex('favorites').where('book_id', req.body.bookId).del())
  }
})

module.exports = router;
