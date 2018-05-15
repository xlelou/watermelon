var express = require('express');
var router = express.Router();
var api_handler = require("../modules/api")

const orderM =  require('../modules/api/orderList');

router.get('/', async (req,res,next)=>{
    let username = req.query.u

    let order = await orderM.find({uname:username}).exec()
    console.log(order)
    res.render('orderView',{order:order})
})

router.delete('/:u/:id', async (req,res,next)=>{
   let username = req.params.u
   let id = req.params.id
    console.log(req)

    
     await  orderM.remove({uname:username,_id:id}, function (error) {  
        if (error) {  
            console.error(error);  
        } else {  
            console.error("删除成功")  
        }  
    });  
    res.json({text:'删除完成'})
  
    // res.render('orderView',{order:order})
})

module.exports = router