const Mose = require('../Mose')
const moment=require("moment");
const tipsListSechema = Mose.Schema({
  
    tips:"String",

    time:Date,

    
},{
	toObject:{
		virtuals:true
	}})
    tipsListSechema.virtual('formatTime').get(function(){ 
        return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
    });

  
module.exports = Mose.model('tipsM',tipsListSechema,'tips')