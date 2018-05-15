
//处理登陆操作的函数，第一个参数是库对象，第二个是响应对象，第三个是参数
const login = (db,res,params)=>{
    //获取到对应的集合collection
    let users = db.collection('users')
    //从users里查找username为params.username且password为params.password数据，并转换成数组
    users.find({username:params.username,password:params.password}).toArray((err,results)=>{
        if(err) throw err;
        if(results.length){//判断有没有此用户
          if(results[0].isOnline){//看看这个号有没有人使用,为true有人上号了
            res.send('1')//让前端判断后不能登陆
          }else{
            //没有人登陆，所以，可以登陆，但是需要把isOnline
            users.update({username:params.username},{$set:{isOnline:true}},(err)=>{
              res.send({uid:results[0]._id,nickname:results[0].nickname,username:results[0].username})//express会处理为字符串
            })          
          }         
        }else{
          res.send('0')
        }

        db.close()//断开数据库连接
    })
}

module.exports = login



