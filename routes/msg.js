var express = require('express');
var router = express.Router();
var msgM = require("../modules/api/message")

router.get( '/:goodId/:u' ,  async (req, res, next) => {

    let goodId = req.params.goodId
    let username = req.params.u

     let msg = await msgM.find({goodId:goodId}).sort({time:-1}).exec()
   res.send(msg);
} );


router.post('/',async (req,res,next)=>{
    let goodId = req.body.goodId
    let username = req.body.u
    let msg = req.body.msg


    let msgC = new msgM({
        goodId:goodId,
        uname:username,
        message:msg,
        time:Date.now()
    })

    await msgC.save()


    res.json({text:'留言成功'})
})

router.delete('/',async (req,res,next)=>{
    let id = req.body.id

    await msgM.remove({_id:id}).exec()
    res.json({text:'删除成功'})

})


router.get( '/wait' , (req,res,next) => {
    let params = req.query
    //api_handler.reduceGood(params,res)
} );
module.exports = router;