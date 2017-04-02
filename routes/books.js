'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
const bodyParser = require('body-parser');

let selectAll = () => knex('books').select().orderBy('title')
let selectOne = (id) => knex('books').where('id', id)
let insertBook = (data) => knex('books').insert(data).returning('*')
let updateBook = (data, id) => knex('books').where('id', id).update(data).returning('*')
let deleteBook = (id) => knex('books').where('id', id)

router.get('/books/', (req, res, next) => {
  selectAll()
  .then(data => {
    res.json(humps.camelizeKeys(data))
  })
})

router.get('/books/:id', (req, res, next) => {
  selectOne(req.params.id)
  .then(data => {
    res.json(humps.camelizeKeys(data[0]))
  })
})

router.post('/books', (req, res, next) => {
insertBook(humps.decamelizeKeys(req.body))
  .then(data => {
    res.json(humps.camelizeKeys(data[0]))
  })
})

router.patch('/books/:id', (req, res, next) => {
updateBook(humps.decamelizeKeys(req.body),req.params.id)
  .then(data => {
    res.json(humps.camelizeKeys(data[0]))
  })
})

router.delete('/books/:id', (req, res, next) => {
  deleteBook(req.params.id)
  .then(data => {
    delete data[0].id
    res.json(humps.camelizeKeys(data[0]))
  })
})

module.exports = router;
