const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const passport = require('passport')
const rotas = require('./router')
const mysql = require('mysql')
const app = express()
const config = require('./env')
const MySQLStoreEnv = require('./utils/MySQLStoreEnv')
var flash = require('connect-flash')
app.use(cookieParser(config.SECRET_KEY))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
const connection = mysql.createConnection(MySQLStoreEnv)
app.use(session({
  secret: config.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({}, connection),
  // store: new session.MemoryStore(),
  cookie: {
    maxAge: 3600000
    // secure: true,
    // httpOnly: true
  }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// ref :https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
app.use(function (req, res, next) {
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.flashCustom = req.session.flashCustom
  delete req.session.flashCustom
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('tiny'))

app.use('/', rotas.comum)
app.use('/candidato', rotas.candidato)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  // console.log(err)
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
