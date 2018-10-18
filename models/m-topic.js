// 模型数据:模型文件：操作话题数据库表并且返回操作数据库的结果
//导入db_config.js
const db = require('../tools/db_config');
exports.findAllTopic = (callback)=>{
     const sqlstr = 'SELECT *FROM`topics`ORDER BY `createdAt` DESC';
     db.query(sqlstr,(err,data)=>{
        //要在c_topic中使用findAllTopic里面query()这个异步操作返回的结果
        // 所以, 通过回调函数的方式将结果以参数的形式进行传递
        if(err){
             return callback(err,null);
        }
        callback(null,data);
     });
}
//向数据库中添加新话题body
exports.addTopic = (body,callback)=>{
    const sqlstr = 'INSERT INTO `topics` SET ?';
    db.query(sqlstr,body,(err,data)=>{
       //要在c_topic中使用findAllTopic里面query()这个异步操作返回的结果
       // 所以, 通过回调函数的方式将结果以参数的形式进行传递
       if(err){
            return callback(err,null);
       }
       callback(null,data);
    }); 
}