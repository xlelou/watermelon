
//处理注册操作的函数，第一个参数是库对象，第二个是响应对象，第三个是参数
const register = (db,res,params)=>{
   let users = db.collection('users')//找见了users集合
   
   users.find({username:params.username}).toArray((err,results)=>{
     console.log('hahaha', results, params)

    
     if(results.length){
       //这个用户已经存在了
       res.send('0')
       db.close()
     }else{
       console.log(params)
        users.insertOne(params,(err,result)=>{
          console.log(arguments)
          console.log(result)
          if(result.insertedCount==1){//插入条数
            //注册成功
            res.send('1')
          }else{res.send('0')}
          
          db.close()
        })

     }
   })

   
   
}

module.exports = register