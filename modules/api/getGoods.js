var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const getGoods = (params,res)=>{
    //下面是解构赋值写法
    let {classid} = params//根据参数获取到classid的值，相当于let classid = params.classid
    console.log(typeof classid)//string
    connect_mongo((db)=>{ //2. 连接mongodb数据库做判断
      let goods = db.collection("goods")//parseFloat(classid)转为数字类型
      let ops = {classid:parseFloat(classid)}
       goods.find(classid===undefined?{}:ops).limit(classid===undefined?0:4).toArray((err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
      })
    })

}

module.exports = getGoods



