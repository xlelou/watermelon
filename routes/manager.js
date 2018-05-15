var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
var ObjectID = require('mongodb').ObjectID
/* GET users listing. */
const usersM = require('../modules/api/users')

router.get('/', function(req, res, next) {
   res.render('manager/login')
});
router.get('/main', function(req, res, next) {
    res.render('manager/main')
 });

router.get('/getBanner', function(req, res, next) {
    api_handler.getBanner(res)//传入一个res就可以做返回了
 });
 
  router.get('/removeBanner', function(req, res, next) {
     let params = req.query
    api_handler.removeBanner(params,res)
 });

  router.post('/addBanner', function(req, res, next) {
    let params = req.body
   api_handler.addBanner(params,res)
});

router.get('/removeGood', function(req, res, next) {
     console.log(2222)
    let params = req.query
    connect_mongo((db)=>{
        db.collection("goods").remove({_id:ObjectID(params._id)},(err)=>{
            if(err) throw err;
            res.send('1')
        })
        db.close()
    })
});

router.post('/addNewGood', function(req, res, next) {
    let params = req.body
    api_handler.addNewGood(params,res)
});

router.get('/getClasses', function(req, res, next) {
    console.log('getClasses')
    connect_mongo((db)=>{
        db.collection("class").find({}).toArray((err,results)=>{
            if(err) throw err;
            console.log(results)
            res.send(results)
        })
    })
});
router.get('/addClasses', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("class").insertOne({class:params.newclass,classid:parseFloat(params.classid)},(err,results)=>{
            if(err) throw err;
            res.send(results.ops)
        })
        db.close()
    })
});

router.get('/getGoodById', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("goods").find({_id:ObjectID(params._id)}).toArray((err,results)=>{
            if(err) throw err;
            res.send(results[0])
        })
        db.close()
    })
});
router.post('/updateGood', function(req, res, next) {
    let params = req.body
    api_handler.updateGood(params,res)
});

 router.get('/login.do',  async (req, res, next) =>{//后端写的接口
   
   let params = req.query
    console.log(params)

    let users =  await usersM.findOne({username:params.username,password:params.password}).exec()
    await usersM.update({username:params.username},{isOnline:true}).exec()
    if(users !== null){
        console.log('登陆成功')
        res.send('ok')
        // res.render('manager/main',{users:users})
    }
//    if(params.username=='admin'&&params.password=='123'){
//         console.log('登陆成功')
//         res.send('ok')
//     }
    // res.send('ok')
 });

 router.post('/loginout',async (req,res,next)=>{
    let params = req.body
    console.log(params)
    await usersM.update({username:params.username},{isOnline:false}).exec()
   res.send('ok')
 })

module.exports = router;
