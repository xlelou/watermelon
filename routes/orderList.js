var express = require('express');
var router = express.Router();
var api_handler = require("../modules/api")

const orderM =  require('../modules/api/orderList');
const carM = require('../modules/api/carList');
router.get( '/' , async (req, res, next) => {
    let order = await orderM.find().exec()
   res.send(order);
} );

router.get( '/:id' , async (req, res, next) => {
    let id = req.params.id
   
    let order = await orderM.find({_id:id}).exec()
 
   res.send(order);
} );

router.post('/',async (req,res,next)=>{
    let params = req.body
    let orderData 
        console.log(params)
        if(params.nowOrder){
             orderData = await orderM.find({_id:params.nowOrder.id}).exec()
        }else{
            orderData = []
        }
   
   
    if(orderData.length>0){
      
       await orderM.update({_id:params.nowOrder.id}, {uname:params.nowOrder.uname,list:params.nowOrder.list,address:params.nowOrder.address,time:Date.now()}).exec()
        
        res.json({text:'更新成功'})
    }else{
        let order = new orderM({
            orderId:params.orderId,
            uid:params.uid,    
            uname:params.uname,
            list:JSON.parse(params.list),
            address:params.address,
            time:Date.now()
        })
        await order.save()
        await carM.remove({uid:params.uid}, function (error) {  
            if (error) {  
                console.error(error);  
            } else {  
                console.error("删除成功")  
            }  
        })
        res.json({text:'保存完成'})
    }
    
  
  
})

router.delete('/:id',async (req,res,next)=>{

    let id = req.params.id
    await  orderM.remove({_id:id}, function (error) {  
        if (error) {  
            console.error(error);  
        } else {  
            console.error("删除成功")  
        }  
    });  
    res.json({text:'删除完成'})
})


router.get( '/wait' , (req,res,next) => {
    let params = req.query
    //api_handler.reduceGood(params,res)
} );
module.exports = router;