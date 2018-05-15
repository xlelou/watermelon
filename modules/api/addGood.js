var connect_mongo = require("../connect_mongo")
//处理前台请求添加购物车商品的操作
const addGood = ({uid,goodid,num},res)=>{
    //先看看有没有接收过来

    //找到这个用户在cars集合里对应的文档(首页的加入购物车)
    num = parseFloat(num)
    connect_mongo((db)=>{
      let cars = db.collection("cars")
      cars.find({uid}).toArray((err,results)=>{
        if(err) throw err
        if(!results.length){//在cars集合里没有此用户的文档
          //创建一个文档放入
          cars.insertOne({uid:uid,goods:[{goodid,num:num?num:1}]},(err,results)=>{
            if(err) throw err;
              res.send('1')//成功返回1
          })

        }else{//如果有这个用户的文档
          let ucar = results[0]    //这个用户的文档
          let isHas = false  
          ucar.goods=ucar.goods.map((item,i)=>{//看看goods里面有没有当前的商品
              if(item.goodid==goodid){//如果取出来的goodid等于传过来的goodid
                isHas = true//看看这里面有没有这个商品,如果有的话数量加1
                item.num+=num?num:1//数量加一
              }
              return item
          })
          if(!isHas){
            ucar.goods.push({goodid,num:num?num:1})//如果没有这个商品就把这个商品加进去
          }           
          //更新用户的购物车数据
          cars.update({uid},{$set:{goods:ucar.goods}},(err,results)=>{
            if(err) throw err;
            console.log(results)
              res.send('1')
          })
        }
        
      })

    })


}

module.exports = addGood



