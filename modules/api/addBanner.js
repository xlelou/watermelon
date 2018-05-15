var connect_mongo = require("../connect_mongo")
const fs = require('fs')
//添加图片
const addBanner = ({title,imgdata},res)=>{
   //1. 将imgdata这个base64格式图片转换成真正的图片存在资源库里

   var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");//先用正则匹配掉imgdata大字符串前端的一些数据
   var dataBuffer = new Buffer(base64Data, 'base64');//创建一个buffer缓冲的这个东西
   var reg = /\/(.+?);/g//正则为了匹配imgdata前的 /jpeg;
  
   var ext = imgdata.match(reg)[0].replace('/','').replace(';','')//match看看有没有符合正则的
   //console.log(ext)//输出['/png;']是一个数组
   var time = Date.now()
//./public/images/banners/banner"+Date.now()+'.'+ext 文件名
   fs.writeFile("./public/images/banners/banner"+time+'.'+ext, dataBuffer, function(err) {//dataBuffer为了转换成base64位的大编码
     if(err){//加一个时间戳是为了可以让5张图片相同
       console.log(err)
     }

   //2. 添加到数据库
      connect_mongo(function(db){
      db.collection("banner").insertOne({title,imgurl:'/images/banners/banner'+time+'.'+ext},(err,results)=>{
        if(err) throw err;
        console.log(results);//results里面有一个ops数组,正是我们新添加进去的图片信息
        res.send(results.ops)//将results.ops返回出去到前端的bannerController控制器里去
      // res.send('1')
      })

     })
   });

}

module.exports = addBanner



