const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const login = require('../models/login')
const bcrypt = require('bcryptjs')

function compararSenha (senha, hash) {
  return bcrypt.compare(senha, hash)
}

passport.serializeUser((id, done) => {
  done(null, id)
})

passport.deserializeUser((id, done) => {
  login.buscarPorId(id)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      done(err, null)
    })
})

const strategy = new LocalStrategy(async (usuario, senha, done) => {
  try {
    usuario = login.buscar(usuario)
    if (!usuario) {
      return done(null, false)
    }
    if (!await compararSenha(senha, usuario.senha)) {
      return done(null, false)
    } else {
      return done(null, usuario)
    }
  } catch (error) {
    return done(error)
  }
})
passport.use(strategy)

module.exports = passport
