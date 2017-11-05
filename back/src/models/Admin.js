'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  "user": {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  "password": {
    type: String,
    required: true,
    trim: true
  },
  "name": String
});

module.exports = mongoose.model('Admin', schema);
