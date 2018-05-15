const Mose = require('../Mose')
const moment=require("moment");
const msgListSechema = Mose.Schema({
  
    goodId:"String",
    uname:"String",
    message:"String",
    time:Date,

    
},{
	toObject:{
		virtuals:true
	}})
    msgListSechema.virtual('formatTime').get(function(){ 
        return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
    });

  
module.exports = Mose.model('msgM',msgListSechema,'message')