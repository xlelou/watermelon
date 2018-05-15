

app.controller("tipsListController",function($scope,_http,$rootScope,data){
    $scope.isUpdateShow = {flag:false}
    $scope.tipsCtt = ''
    $scope.username = ''
    // $scope.newgood = {}
    // $scope.classes = []//存放当前现有的分类
    // $scope.newgood.classid = 1
    _http({//获取全部商品
        url:"/tips",
        success:function(results){
            console.log(results)
            $scope.tips = results
        }
    })



    $scope.updateShow = function (_id) {//显示编辑modal
        console.log(_id)
        $scope.isUpdateShow= {flag : true}
        //获取此商品的信息，在updateController里面用
        _http({
            url:'/tips/'+_id,
            success:function (results) {
                console.log(results)
               $rootScope.nowTips = results[0]
            }
        })
    }

    $scope.add = function(){
     
        if($scope.tipsCtt === ''){
            alert('请输入公告内容')
            return false
        }
       
        _http({
            url:'/tips',
            data:{
                tips:$scope.tipsCtt, 
            },
            dataType:'json',
            type:'post',
            success:function(results){
                console.log(results)
                window.location.reload()
            }
        })
    }

    $scope.remove = function (_id,index) {
        _http({//删除商品
            url:"/tips/"+_id, 
            type:"delete",
            success:function(results){
                console.log(results)
                $scope.tips.splice(index,1)
              //  if(results == 1){
                //    alert('删除成功')
                   // $scope.tips.splice(index,1)
              //  }              
            }
        })
    }
})


app.controller("tipsUpdateController",function ($scope,_http,data,$rootScope) {
   
    $scope.data = data

    $scope.update = function () {
        console.log(1111)
        console.log($rootScope.nowTips)
 
        _http({
            url:"/tips",
            type:'post',
            dataType:'json',
            data:{
                data:$rootScope.nowTips
            },
            success:function(results){
                console.log(results)
                console.log($rootScope.nowTips)
                for(var i=0;i<$scope.tips.length;i++){
                    if($scope.tips[i]._id==$rootScope.nowTips._id){
                        $scope.tips[i]=$rootScope.nowTips
                        break;
                    }
                }
                $scope.isUpdateShow.flag = false
                // window.location.reload()
            }
        })
    }

    $scope.removeOrder = function (_id,index) {

        $rootScope.nowTips.list.splice(index,1)
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