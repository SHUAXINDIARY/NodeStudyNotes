var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');

var app = express();

/**
 * 5.0去除了configureapi
 * 使用get方法获取全局变量
 * 注意：还有一个get方法是http的get请求
 */
// const env = process.env.NODE_ENV
const env = app.get('env')
if (env === 'development') {
  // 开发环境 开启日志
  console.log('开发环境');
  app.use(logger('dev'));

} else {
  // 生产环境 
  console.log('生产环境');
}


app.use(express.json());
// 使用官方的querystring还是第三方的qs
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 加载静态资源
app.use(express.static(path.join(__dirname, 'public')));


// 加载路由
app.use('/', indexRouter);
app.use('/todo', todoRouter);

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
});

module.exports = app;
