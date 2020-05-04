const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Login = require('../models/login')
const bcrypt = require('bcryptjs')

function compararSenha (senha, hash) {
  return bcrypt.compare(senha, hash)
}

passport.serializeUser((id, done) => {
  done(null, id)
})

passport.deserializeUser((id, done) => {
  const login = new Login({
    id: id
  })
  login.buscarPorId()
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      done(err, null)
    })
})

passport.use('login', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'senha'
}, async (usuario, senha, done) => {
  console.log(usuario)
  console.log(senha)
  try {
    const login = new Login({
      usuario: usuario
    })
    usuario = await login.buscarPorUsuario()
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
