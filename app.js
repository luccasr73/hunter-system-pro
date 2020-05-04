const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const rotas = require('./router')
const flash = require('connect-flash')
const app = express()
const config = require('./env')

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(config.SECRET_KEY))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(session({
  secret: config.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: {
    maxAge: 3600000,
    secure: true,
    httpOnly: true
  }
}))
app.use(flash())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('combined'))

app.use(passport.initialize())
app.use(passport.session())

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
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
