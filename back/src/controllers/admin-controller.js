'use strict'

const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')

exports.get = (req, res) => {
  if (req.session.admin) {
    res.status(200).send({
      auth: true,
      admin: {
        user: req.session.admin.user,
        name: req.session.admin.name
      }
    })
  } else {
    res.status(403).send({
      auth: false,
      msg: 'Nenhum admin está logado'
    })
  }
}

exports.post = (req, res) => {
  let auth = false

  function authenticate (admin) {
    return new Promise(resolve => {
      req.session.regenerate(() => {
        req.session.admin = { user: admin.user, name: admin.name }
        resolve()
      })
    })
  }

  Admin.findOne({ user: req.body.user })
  .then(admin => {
    if (admin.password === req.body.password) {
      authenticate(admin)
      .then(() => {
        res.status(200).send({
          auth: true,
          msg: 'Login realizado com sucesso!',
          user: admin.user,
          name: admin.name
        })
      })
    } else {
      res.status(403).send({
        auth: false,
        msg: 'Usuário ou senha incorretos'
      })
    }
  })
  .catch(() => {
    res.status(403).send({
      auth: false,
      msg: 'Usuário e/ou senha incorretos'
    })
  })
}
