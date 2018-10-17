//程序入口文件
//1.导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require("express-session");

//2.app对象
const app = express();
//3.配置模板引擎包
app.engine('html', require('express-art-template'));
//3.监听请求 不属于程序入口文件干的事  见router.js
// 处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
//配置express-session包
app.use(session({
    secret: 'keyboard cat',
  	resave: false,
  	saveUninitialized: true
}));

//注意这行代码的位置  //使用包
app.use(router);
//4.绑定端口
app.listen(12345,()=>{
    console.log('run it'); 
});