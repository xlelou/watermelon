

app.controller("orderListController",function($scope,_http,$rootScope,data){
    $scope.isUpdateShow = {flag:false}
    // $scope.newgood = {}
    // $scope.classes = []//存放当前现有的分类
    // $scope.newgood.classid = 1
    _http({//获取全部商品
        url:"/orderList",
        success:function(results){
            console.log(results)
            $scope.orderList = results
        }
    })
    console.log(1)


    $scope.updateShow = function (_id) {//显示编辑modal
        console.log(_id)
        $scope.isUpdateShow= {flag : true}
        //获取此商品的信息，在updateController里面用
        _http({
            url:'/orderList/'+_id,
            success:function (results) {
                console.log(results)
               $rootScope.nowOrder = results[0]
            }
        })
    }

    $scope.remove = function (_id,index) {
        _http({//删除商品
            url:"/orderList/"+_id, 
            type:"delete",
            success:function(results){
                console.log(results)
                $scope.orderList.splice(index,1)
              //  if(results == 1){
                //    alert('删除成功')
                   // $scope.orderList.splice(index,1)
              //  }              
            }
        })
    }
})


app.controller("orderUpdateController",function ($scope,_http,data,$rootScope) {
   
    $scope.data = data

    $scope.update = function () {
        console.log(1111)
        console.log($rootScope.nowOrder)
        _http({
            url:"/orderList",
            type:'post',
            dataType:'json',
            data:{
                nowOrder:$rootScope.nowOrder
            },
            success:function(results){
                console.log(results)
                for(var i=0;i<$scope.orderList.length;i++){
                    if($scope.orderList[i]._id==$rootScope.nowOrder._id){
                        $scope.orderList[i]=$rootScope.nowOrder
                        break;
                    }
                }
                $scope.isUpdateShow.flag = false

            }
        })
    }

    $scope.removeOrder = function (_id,index) {

        $rootScope.nowOrder.list.splice(index,1)
        console.log($rootScope.nowOrder)
    
    }

  

})