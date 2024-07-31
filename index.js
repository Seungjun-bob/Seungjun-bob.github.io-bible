const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const timeOut = 1000*60*10
require('dotenv').config();
const logger = require('./logger');

// const session = require('express-session'); 
// // const sessionStore = require('session-file-store')(session);
// const sessionStore = require('express-mysql-session')(session);

// 인증 구현
// const { passport } = require('./utils/auth');

const indexRouter = require('./routes/home');


const cors = require('cors');
const HTTPS = require('https');
const HTTP = require('http');
const nodeENV = process.env.NODE_ENV

var app = express();

var favicon = require('serve-favicon'); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.all('*', (req, res, next)=>{
//   let protocol = req.headers['x-forwarded-proto'] || req.protocol;

//    if (protocol == 'http')
//    {
//        next();
//    }
//    else
//    {
//        let from = `${protocol}://${req.hostname}${req.url}`;
//        let to = `http://${req.hostname}:${process.env.PORT}${req.url}`;
//        res.redirect(to);
//    }
// });

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/public/javascripts'));
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/font', express.static(__dirname + '/public/font'));
// app.use('/scss', express.static(__dirname + '/public/scss'));
// app.use('/imgFile', express.static(__dirname + '/uploadedFiles'));

//jquery
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist'));
//bootstrap
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist'));
//jspdf
app.use('/jspdf', express.static(__dirname + '/node_modules/jspdf/dist'));

// app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
// app.use('/md', express.static(__dirname + '/node_modules/marked'));
// file 경로
// const staticFilesPath = path.join('/', 'mount');
// app.use('/files', express.static(staticFilesPath));
//i18n 초기화
// app.use(i18n);
// app.use(function (req, res, next) {
//   var locale = 'es'
//   console.log(req.cookies.lang)
//   if(req.cookies.lang){
//     locale = req.cookies.lang
//   }else{
//     res.cookie('lang', 'es');
//   }
//   next()
// })

// app.get('/en', (req, res) => {
//   res.cookie('lang', 'en');
//   res.redirect('../');
// });
// app.get('/es', (req, res) => {
//   res.cookie('lang', 'es');
//   res.redirect('../');
// });

// const mysqlOption = {
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PW,
// 	database: process.env.DB_DATABASE,
// }
// 세션은 db 관리
// sessions 테이블
// if (nodeENV === 'production'){
//   app.use( // 미들웨어 적용
//     session({
//       httpOnly: true,
//       secret: process.env.SESSION_SECRET_KEY,
//       resave: false,
//       saveUninitialized: true,
//       sameSite: 'None',
//       cookie: {
//         httpOnly: true,
//           secure: true,
//           sameSite: 'None'
//       },
//     store: new sessionStore(mysqlOption)
//     })
//   );
//   }else{
//     app.use( // 미들웨어 적용
//     session({
//       httpOnly: true,
//       secret: process.env.SESSION_SECRET_KEY,
//       resave: false,
//       saveUninitialized: true,
//       sameSite: 'None',
//       cookie: {
//         httpOnly: true,
//         // secure: true
//       },
//     store: new sessionStore(mysqlOption)
//     })
//   );
// }


/** Router 설정 */
app.use('/', indexRouter);


// CORS 설정 cross domain 설정
// const corsOptions = {
// 	origin: '*', // 허락하고자 하는 요청 주소
// 	// credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
// };
// app.use(cors(corsOptions));
app.disable('x-powered-by'); // optional, to remove X-Powered-By header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.removeHeader('X-Frame-Options');
  next();
});

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => { // 이 부분 실행
//     console.log('serialize')
//     return done(null, user);
//   });
// passport.deserializeUser(function(user, done) {
//     //findById(id, function (err, user) {
//     console.log('deserialize');
//     done(null, user);
//     //});
// });

// app.use(function(req, res, next){
//     //항상 esj 로컬 페이지에서 사용이 용이하도록
//     res.locals.emp_no = session.emp_no;
//     next();
// })


/*  HTTPS 또는 HTTP 설정 ========== */

;
// HTTP.createServer(app).listen(process.env.PORT, function () {
//   console.log("===========================================================");
//   console.log("Listening on http port " + process.env.PORT);
//   console.log("===========================================================");
// }).timeout = timeOut;
// if (nodeENV === 'development_nodemon'){
  HTTP.createServer(app).listen(process.env.PORT, function () {
    console.log("===========================================================");
    console.log("Listening on http port " + process.env.PORT);
    console.log("===========================================================");
  }).timeout = timeOut;
// }
// else if(nodeENV === 'development'){
//   var ssl_options =
//   {
//     key: fs.readFileSync(process.env.SSL_KEY),
//     cert:fs.readFileSync(process.env.SSL_CERT),
//     ca: [
//       fs.readFileSync(process.env.SSL_CA1),
//       fs.readFileSync(process.env.SSL_CA2),
//       fs.readFileSync(process.env.SSL_CA3)
//     ]
//   }
//   HTTPS.createServer(ssl_options, app).listen(process.env.PORT, function () {
//     console.log("===========================================================");
//     console.log("Listening on https port " + process.env.PORT);
//     console.log("===========================================================");
//   }).timeout = timeOut;
// }else if(nodeENV === 'production'){
//   var ssl_options =
//   {
//     key: fs.readFileSync(process.env.SSL_KEY),
//     cert:fs.readFileSync(process.env.SSL_CERT),
//     ca: [
//       fs.readFileSync(process.env.SSL_CA1),
//       fs.readFileSync(process.env.SSL_CA2),
//       fs.readFileSync(process.env.SSL_CA3)
//     ]
//   }
//   HTTPS.createServer(ssl_options, app).listen(process.env.PORT, function () {
//     console.log("===========================================================");
//     console.log("Listening on https port " + process.env.PORT);
//     console.log("===========================================================");
//   }).timeout = timeOut;
// }



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
