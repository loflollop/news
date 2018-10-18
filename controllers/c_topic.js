//渲染话题列表页  导出  合并
// 导入模型文件
const m_topic = require('../models/m-topic');
const moment = require('moment');
exports.showTopic = (req,res)=>{
    // res.send('话题列表页');
    //res.render(V,M);参一:  参二:数据{对象}
    //要数据  ->让模型去给数据 ->调用模型.方法
    m_topic.findAllTopic((err,data)=>{
        if (err){
            return res.send({
                code:500,
                message:'服务器错了'
            });
        }
        // console.log(data);
        //data  类型  是数组 
        //如果用户登录成功，把用户信息进行传递 在header.html使用
        res.render('index.html',{
            topics:data,
            user: req.session.user
        });
    });
};
//发布新话题
exports.createTopic = (req,res)=>{
    res.render('topic/create.html');
};
//处理发布新话题的表单
exports.handleCreateTopic = (req,res) =>{
   //获取表单数据
   const body = req.body;
   //给body设置createdAt时间
    body.createdAt = moment().format();
    //给每个话题添加userId  目的是区分当前要添加的话题是由谁创建的
    //要找用户id ->先找到用户 ->req.session.user.id   c_user.js
    body.userId = req.session.user.id;
    // console.log(body);
    
   //把body添加到数据库中
   //找模型文件中的某个方法 m_topic.xxx
   m_topic.addTopic(body,(err,data)=>{
        //操作数据库返回的结果
        if(err){
            return res.send({
                code:500,
                message:'服务器错啦'
            })
        }
        //添加成功  返回响应code==200
        res.send({
            code:200,
            message:'发布新话题成功'
        });  
    }); 
};
//渲染话题详情页
exports.showDetail = (req,res)=>{
    
    //html中 a href = '/topic/ {{$value.id}}'
    //router 中.get('/topic/:topicID');
    //在控制器c_topic.js 中 获取topicID
    // console.log(req.params);//{topicID:'7'}
    const topicID = req.params.topicID;
    //根据当前话题的id值  topicID  去数据库中找到话题数据
    res.render('topic/show.html');
    

}