//  控制器c_user.js中数据库操作的部分提取
//mysql相关的配置

//导入数据库配置的模块
const db = require('../tools/db_config');
//1.验证邮箱
// 检查邮箱===多个邮箱导出  req.body
const checkEmail = function (email,callback) {
    const sqlstr = 'SELECT *FROM `users` WHERE email=?';
    db.query(sqlstr, email, (err, data) => {
        if (err) {
            return callback(err,null);
        }
        callback(null,data);
        //callback(err,data);
    })
};
exports.checkEmail = checkEmail;
//2.