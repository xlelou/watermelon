const Mose = require('../Mose')
const moment=require("moment");
const carListSechema = Mose.Schema({
  
    uid:"String",
    goods:{}
    
    
},{
	toObject:{
		virtuals:true
	}})

  

module.exports = Mose.model('carM',carListSechema,'cars')