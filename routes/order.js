var express = require('express');
var router = express.Router();
var api_handler = require("../modules/api")

router.get( '/' ,  (req, res, next) => {
     
   res.send(1);
} );
router.get( '/wait' , (req,res,next) => {
    let params = req.query
    //api_handler.reduceGood(params,res)
} );
module.exports = router;