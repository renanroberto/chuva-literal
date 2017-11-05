'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin-controller')

router.get('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).send('logout success')
  })
})

module.exports = router
