var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var autorRouter = require('./routes/autorRoute');
var czytelnikRouter = require('./routes/czytelnikRoute');
var ksiazkaRouter = require('./routes/ksiazkaRoute');
var wypozyczenieRouter = require('./routes/wypozyczenieRoute');
const autorApiRouter = require('./routes/api/AutorApiRoute');
const czytelnikApiRouter = require('./routes/api/CzytelnikApiRoute');
const ksiazkaApiRouter = require('./routes/api/KsiazkaApiRoute');
const wypozyczenieApiRouter = require('./routes/api/WypozyczenieApiRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));

const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang'
});
app.use(i18n.init);
app.use((req,res,next) =>{
  if(!res.locals.lang){
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
})

const session = require('express-session');
const authUtils = require("./util/authUtils");


app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
})


app.use('/', indexRouter);
app.use('/autor', authUtils.permitAuthenticatedUser, autorRouter);
app.use('/czytelnik', czytelnikRouter);
app.use('/ksiazka', authUtils.permitAuthenticatedUser, ksiazkaRouter);
app.use('/wypozyczenie', authUtils.permitAuthenticatedUser, wypozyczenieRouter);
app.use('/api/autor', autorApiRouter);
app.use('/api/czytelnik',czytelnikApiRouter);
app.use('/api/ksiazka', ksiazkaApiRouter);
app.use('/api/wypozyczenie', wypozyczenieApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
