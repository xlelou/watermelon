

var app = angular.module("app",['ui.router','service'])

app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','/main')//如果没有路由的话 默认就是/main路由
    // $urlRouterProvider.otherwise('/A')
    $stateProvider.state('main', {
        url:'/main',
        templateUrl: '../../template/main.html'
    }).state('banner', {
        url:'/banner',
        templateUrl: '../../template/banner.html',
        controller:"bannerController"
    }).state('goods', {
        url:'/goods',
        templateUrl: '../../template/goods.html',
        controller:"goodsController"
    })
    .state('orderList',{
        url:'/orderList',
        templateUrl:'../../template/orderList.html',
        controller:"orderListController"
    })
    .state('tips',{
        url:'/tips',
        templateUrl:'../../template/tips.html',
        controller:"tipsListController"
    })
    .state('usersList',{
        url:'/usersList',
        templateUrl:'../../template/usersList.html',
        controller:"usersListController"
    })
}])