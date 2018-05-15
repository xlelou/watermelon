
var login = require('./login')
var register = require('./register')
var getGoods = require('./getGoods')
var getGoodsInList = require('./getGoodsInList')
var addGood = require('./addGood')
var reduceGood = require('./reduceGood')
var removeGood = require('./removeGood')
var getBanner = require('./getBanner')
var removeBanner = require('./removeBanner')
var addBanner = require('./addBanner')
var addNewGood = require('./addNewGood')
var updateGood = require('./updateGood')
let orderList = require('./orderList')
const api_handler = {
    login,register,getGoods,getGoodsInList,addGood,reduceGood,removeGood,getBanner,removeBanner,addBanner,addNewGood,updateGood,//各种接口 在goods里就可以用了

}

module.exports = api_handler