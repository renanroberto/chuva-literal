'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/post-controller')

router.get('/', controller.get)
router.post('/', controller.restrict, controller.post)

module.exports = router
