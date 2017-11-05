'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  "title": {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  "slug": {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  "content": String,
  "date": {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Post', schema);
