// 引入中间件
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

const dPath = require('./mongoPath');
const Db = require(dPath.PATH_MDB);
const AccountModel = require(dPath.PATH_ACCOUNT);

var app = express();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views/admin'),
  path.join(__dirname, 'views/index')
]);
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// 加载cookie
app.use(cookieParser('qinagzai'));
// session中间件  qinagzai加密
app.use(session({
  secret: 'qinagzai',
  resave: false,
  saveUninitialized: false,
}));
// 静态资源挂载
app.use(express.static(path.join(__dirname, 'public')));

// 验证cookie的有效性
app.use(function (req, res, next) {
  let token = req.signedCookies.token;
  // 没有去下一步
  if (!token) {
    req.session.token = null;
    next();
  } else {
    Db.findById(AccountModel, token, function (derr, dres) {
      if (dres) {
        req.session.token = dres;
        // 记录当前用户是谁
        res.locals.user = dres;
      }
      next();

    })
  }
})
// 登录拦截
app.use(function (req, res, next) {
  let url = req.originalUrl;
  // 判断是否是前台旅游
  if (url.startsWith('/index')) {
    // 可以访问
    next();
  } else if (url != '/admin/login' && !req.session.token) {
    return res.redirect('/admin/login');
  } else {
    next();
  }
});



app.use(function (req, res, next) {
  res.locals.cp = req.path;
  next();
})

// 引用后台路由
var indexRouter = require('./routes/admin/index');
var loginRouter = require('./routes/admin/login')
var aboutRouter = require('./routes/admin/about');
var serviceRouter = require('./routes/admin/service');
var kehuRouter = require('./routes/admin/kehu');
// 加载后台路由
app.use('/admin/index', indexRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/about', aboutRouter);
app.use('/admin/service', serviceRouter);
app.use('/admin/kehu', kehuRouter);

// 引入前台路由
var f_indexRouter = require('./routes/index/home');
// 加载前台路由
app.use('/index', f_indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;