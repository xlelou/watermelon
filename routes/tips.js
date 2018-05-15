var express = require('express');
var router = express.Router();
var api_handler = require("../modules/api")

const tipsM =  require('../modules/api/tips');

router.get( '/' , async (req, res, next) => {
    let tips = await tipsM.find({}).sort({'_id':-1}).exec()
   res.send(tips);
} );

router.get( '/:id' , async (req, res, next) => {
    let id = req.params.id
   
    let tips = await tipsM.find({_id:id}).exec()
 
   res.send(tips);
} );

router.post('/',async (req,res,next)=>{
    let params = req.body
    let data 
        console.log(params)
        if(params.data){
             data = await tipsM.find({_id:params.data.id}).exec()
        }else{
            data = []
        }
   
   
    if(data.length>0){
      
       await tipsM.update({_id:params.data.id}, {tips:params.data.tips,time:params.data.time}).exec()
        
        res.json({text:'更新成功'})
    }else{
        let tips = new tipsM({
            tips:params.tips,
            
        
          
            time:Date.now()
        })
        await tips.save()
       
        res.json({text:'保存完成'})
    }
    
  
  
})

router.delete('/:id',async (req,res,next)=>{

    let id = req.params.id
    await  tipsM.remove({_id:id}, function (error) {  
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