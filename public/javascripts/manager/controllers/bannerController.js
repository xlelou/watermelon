app.controller("bannerController",function($scope,_http){
    //获取轮播图数据
    _http({
        url:'/manager/getBanner',
        success:function(results){
            $scope.banners = results
        }
    })
    //删除某一个图片
    $scope.removeBanner = function(_id,index){
        _http({
            url:'/manager/removeBanner',
            data:{_id:_id},
            success:function(results){
                if(results==1){
                    alert('删除成功')
                    $scope.banners.splice(index,1)
                }
            }
        })
    }
    //添加图片
    $scope.uploadImg = function(){
        var inp = document.getElementsByClassName('uploadinp')[0]
        var img = inp.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(img)//转换为base64
        reader.onload = function (e) {
            console.log(this.result)

            _http({
                url:'/manager/addBanner',
                type:'post',
                data:{
                    title:$scope.title,
                    imgdata:this.result
                },success:function(results){//从addBanner.js里拿到results,results就是ops
                    console.log(results)
                    if(results){//如果result存在就可以 
                        alert('上传成功')//输出的result值是一个数组  对我们有用的是第一条数据
                        $scope.banners.push(results[0])//因为页面中banners改变m值   v值就随之改变 这样页面中就会多一条数据
                        $scope.isUploadShow = false//关掉上传图片的那个大弹框
                    
                    }
                }
            })
        }
    }

})