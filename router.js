//路由模块
// 目的: 监听请求并且找到每个请求的方法名
//1.导包
//2.express.Router()获取对象router
//3.router.get()
//4.导出对象 router
const express = require('express');
//导入 控制器文件  用户，话题模块
const c_user = require('./controllers/c_user');
const c_topic =require('./controllers/c_topic');

const router = express.Router();
//3.监听请求  router.get()
//渲染登录页的表单请求
router.get('/signin',c_user.showSignin);//参二：回调
//监听登录的表单请求
router.post('/signin',c_user.handleSignin),

//渲染话题页
router.get('/',c_topic.showTopic);
module.exports = router;
