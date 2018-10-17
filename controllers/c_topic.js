//渲染话题列表页  导出  合并
// 导入模型文件
const m_topic = require('../models/m-topic')
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