//用户登录，注册相关的请求  控制器
//导入m_user.js
const m_user = require('../models/m-user')
//mysql相关的配置
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'news'
// });
// connection.connect();
const showSignin = (req, res) => {
    res.render('signin.html');//调用渲染
};
//处理登录的请求
const handleSignin = (req, res) => {
    //1.获取表单数据
    const body = req.body;
    // console.log(body);

    // 调用Models中的验证邮箱的方法
    // 目的: 获取数据库操作返回的结果err, data

    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            // throw err;
            return res.send({
                code: 500,
                message: '服务器错误' 
            })
        }
        //邮箱不存在
        if (!data[0]) {
            return res.send({
                code: 1,
                message:'邮箱不存在，快去注册' 
            })
        }
        //邮箱存在
        //3.后验证密码
        if (body.password != data[0].password) {
            return res.send({
                code: 2,
                message: '密码错误' 
            })
        }
        //把正确的用户信息data[0]保存起来  session
        //body-parser ->req.body
        //express-art-template ->res.render
        //express-session ->req.session
        
        // express-session包 保存的数据 不是持久化保存
        // mysql包  express-mysql-session
        //  express-mysql-session: 
        // 把express-session保存的信息req.session自动保存在数据库中
        req.session.user = data[0];
        // console.log(req.session.user);
        
        //4.跳转到话题列表页
        res.send({
            code: 200,
            message: '可以跳转了' 
        })
    })
    //2.先验证邮箱
    //     const sqlstr = 'SELECT *FROM `users` WHERE email=?';
    //     connection.query(sqlstr,body.email,(err,data)=>{
    //         if(err){
    //             // throw err;
    //             return res.send(err)
    //         }
    //         //邮箱不存在
    //         if(!data[0]){
    //             return res.send('邮箱不存在，快去注册')
    //         }
    //         // 邮箱存在
    //         //3.后验证密码
    //         if(body.password !=data[0].password){
    //             return res.send('密码不对，再想想')
    //         }
    //         //4.跳转到话题列表页
    //         res.redirect('/');//重定向
    //     })
};
//处理用户退出的请求
exports.handleSignout = (req,res)=>{
    //清除session 中的保存的用户信息
    delete req.session.user;
    //跳转到用户登录页
    res.redirect('/signin');
}
    //导出  登录页
    exports.showSignin = showSignin;
    exports.handleSignin = handleSignin;