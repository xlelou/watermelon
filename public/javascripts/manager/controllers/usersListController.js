

app.controller("usersListController",function($scope,_http,$rootScope,data){
    $scope.isUpdateShow = {flag:false}
    $scope.tipsCtt = ''
    $scope.newUserName = ''
    $scope.newPassword = ''
    $scope.newNickName = ''
    $scope.newIsOnline = false
    // $scope.newgood = {}
    // $scope.classes = []//存放当前现有的分类
    // $scope.newgood.classid = 1
    _http({//获取全部商品
        url:"/usersList",
        success:function(results){
            console.log(results)
            $scope.usersList = results
        }
    })



    $scope.updateShow = function (_id) {//显示编辑modal
        console.log(_id)
        $scope.isUpdateShow= {flag : true}
        //获取此商品的信息，在updateController里面用
        _http({
            url:'/usersList/'+_id,
            success:function (results) {
                console.log(results)
               $rootScope.nowUsersList = results[0]
            }
        })
    }

    $scope.add = function(){
        console.log( $scope.newIsOnline)
        if($scope.newUserName === ''){
            alert('请输入用户名')
            return false
        }

        for(var i = 0;i<$scope.usersList.length;i++){
            if($scope.usersList[i].username ===$scope.newUserName ){
                alert('用户名已存在')
                return false
            }
        }
        if($scope.newNickName === ''){
            alert('请输入昵称')
            return false
        }

        if($scope.newPassword === ''){
            alert('请输入密码')
            return false
        }
       
        _http({
            url:'/usersList',
            data:{
                username:$scope.newUserName, 
                password:$scope.newPassword, 
                nickname:$scope.newNickName, 
                isOnline:$scope.newIsOnline
            },
            dataType:'json',
            type:'post',
            success:function(results){
                console.results
                window.location.reload()
            }
        })
    }

    $scope.remove = function (_id,index) {
        _http({//删除商品
            url:"/usersList/"+_id, 
            type:"delete",
            success:function(results){
                console.log(results)
                $scope.usersList.splice(index,1)
              //  if(results == 1){
                //    alert('删除成功')
                   // $scope.usersList.splice(index,1)
              //  }              
            }
        })
    }
})


app.controller("usersUpdateController",function ($scope,_http,data,$rootScope) {
   
    $scope.data = data

    $scope.update = function () {
        console.log(1111)
       
 
        _http({
            url:"/usersList",
            type:'post',
            dataType:'json',
            data:{
                data:$rootScope.nowUsersList
            },
            success:function(results){
                console.log(results)
             
                for(var i=0;i<$scope.usersList.length;i++){
                    if($scope.usersList[i]._id==$rootScope.nowUsersList._id){
                        $scope.usersList[i]=$rootScope.nowUsersList
                        break;
                    }
                }
                $scope.isUpdateShow.flag = false
                // window.location.reload()
            }
        })
    }

    $scope.removeOrder = function (_id,index) {

        $rootScope.nowUsersList.list.splice(index,1)
        console.log($rootScope.nowTips)
    
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
              (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }

})