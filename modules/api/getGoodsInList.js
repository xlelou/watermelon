var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const getGoodsInlist = (params,res)=>{
    //下面是解构赋值写法   classid为类型，order为排序依据  keyword是关键字 pagesize是每页数量 pagenum是页数
    let {classid,order,keyword,pageSize,pageNum} = params//根据参数获取到classid的值，相当于let classid = params.classid
    console.log(typeof classid)//string
    connect_mongo((db)=>{ //2. 连接mongodb数据库做判断
      let goods = db.collection("goods")//parseFloat(classid)转为数字类型
      let rule = {}//控制classid
      let sort_rule = {}//控制sort
      if(order){//如果order存在，说明要按照价格或人气排序
        sort_rule[order] = -1
      }
      if(keyword){
        rule.keyword=new RegExp("" + keyword + "");
      }
      //size 5 page 2 6-10 start num*size size
      if(parseFloat(classid)){//如果为0说明要查找所有的数据，不用加限定条件
        rule.classid = parseFloat(classid)
      }
      
       let limit = parseFloat(pageSize)
      //skip代表从哪里开始取，limit代表取几个
      goods.find(rule).sort(sort_rule).skip(pageSize*(pageNum-1)).limit(limit).toArray((err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)

        db.close()
      })
    })

}

module.exports = getGoodsInlist



