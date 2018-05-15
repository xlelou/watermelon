const Mose = require('../Mose')
const moment=require("moment");
const orderListSechema = Mose.Schema({
    orderId:"String",
    uid:"String",
    uname:'String',
    list:{},
    address:'String',
    time:Date
    
},{
	toObject:{
		virtuals:true
	}})

    orderListSechema.virtual("formatTime").get(function(){ 
	return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
});

module.exports = Mose.model('orderM',orderListSechema,'order')