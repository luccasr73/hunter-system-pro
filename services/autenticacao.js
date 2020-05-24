const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Login = require('../models/login')
const bcrypt = require('bcryptjs')

function compararSenha (senha, hash) {
  return bcrypt.compare(senha, hash)
}

passport.serializeUser((usuario, done) => {
  // console.log('serialize')
  // console.log('log deserialize user', usuario)
  Login.buscarPorUsuario(usuario.usuario)
    .then((usuario) => {
      // console.log('log serialize user', usuario)
      done(null, usuario.id)
    })
    .catch((err) => {
      // console.log('log deserialize err', err)
      done(err, null)
    })
})

passport.deserializeUser((id, done) => {
  // console.log('deserialize')
  // console.log('log deserialize user', id)
  Login.buscarPorId(id)
    .then((usuario) => {
      // console.log('log deserialize user', usuario)
      done(null, { id: usuario.id, tipo: usuario.tipo })
    })
    .catch((err) => {
      // console.log('log deserialize err', err)
      done(err, null)
    })
})

passport.use('login', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'senha'
}, async (usuario, senha, done) => {
  try {
    usuario = await Login.buscarPorUsuario(usuario)
    if (!usuario) {
      console.log('usuario n existe')
      return done(null, false, { message: 'Usuario incorreto' })
    }
    if (!await compararSenha(senha, usuario.senha)) {
      console.log('senha errada')
      return done(null, false, { message: 'Senha incorreta' })
    } else {
      return done(null, usuario)
    }
  } catch (error) {
    return done(error)
  }
}))

const authenticationMiddleware = () => {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/index')
  }
}

module.exports = {
  authenticationMiddleware,
  passport
}
