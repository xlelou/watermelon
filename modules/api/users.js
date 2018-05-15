const Mose = require('../Mose')
const moment=require("moment");
const usersListSechema = Mose.Schema({
  
    username:"String",
    password:"String",
    nickname:'String',
    isOnline:'Boolean',


    
},{
	toObject:{
		virtuals:true
	}})
 

  
module.exports = Mose.model('usersM',usersListSechema,'users')