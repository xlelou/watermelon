var express = require('express');
var router = express.Router();
const usersM = require('../modules/api/users')

router.get('/', async (req, res, next) => {
    let users = await usersM.find().exec()

    res.send(users);
});

router.get( '/:id' , async (req, res, next) => {
    let id = req.params.id
   
    let users = await usersM.find({_id:id}).exec()
 
   res.send(users);
} );
router.post('/', async (req, res, next) => {
    let params = req.body
    console.log(params)
    let data
    console.log(params)
    if (params.data) {
        data = await usersM.find({
            _id: params.data.id
        }).exec()
    } else {
        data = []
    }


    if (data.length > 0) {

        await usersM.update({
            _id: params.data.id
        }, {
            username: params.data.username,
            password: params.data.password,
            nickname: params.data.nickname,
            isOnline: params.data.isOnline,
        }).exec()

        res.json({
            text: '更新成功'
        })
    } else {
        let users = new usersM({
            username: params.username,
            password:params.password,
            nickname:params.nickname,
            isOnline:params.isOnline,

        })
        await users.save()

        res.json({
            text: '保存完成'
        })
    }
});


router.delete('/:id',async (req,res,next)=>{

    let id = req.params.id
    await  usersM.remove({_id:id}, function (error) {  
        if (error) {  
            console.error(error);  
        } else {  
            console.error("删除成功")  
        }  
    });  
    res.json({text:'删除完成'})
})


module.exports = router