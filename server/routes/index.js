const express = require('express')
const fs = require('fs')
const path = require('path')

const { getData, writeData, getById } = require('../utils')
const filepath = path.join(__dirname, '../', 'data', 'data.json')

const router = express.Router()

module.exports = router

router.get('/', async (req, res) => {
  const data = await getData(filepath)
  return res.render('home', data)
})

router.get('/puppies/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = await getById(id, filepath)

  return res.render('details', data)
})

router.get('/puppies/:id/edit', async (req, res) => {
  const id = Number(req.params.id)
  const data = await getById(id, filepath)

  return res.render('edit', data)
})

router.post('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  const { name, breed, owner, image } = req.body
  const updatedPuppy = { id, name, breed, owner, image }
  
  writeData(updatedPuppy)
  res.redirect('/puppies/' + id)
})
