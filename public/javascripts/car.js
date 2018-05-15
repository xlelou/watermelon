//处理购物车操作的js


var car = {
    init:function(){
        this.addEvent()
       
    },
    addGood:function(params,cb){//params是uid 和 goodid
        //发送请求到服务端
        $.ajax({
            url:"/goods/addGood",
            data:params,
            success:cb
        })
        //  success:function(results){
        //        console.log(results)
        //        cb(results)
        //    }
           
    },
    reduceGood:function(params,cb){//params是uid 和 goodid
        //发送请求到服务端
        $.ajax({
            url:"/goods/reduceGood",
            data:params,
            success:cb
        })
           
    },
    removeGood:function(params,cb){//params是uid 和 goodid
        //发送请求到服务端
        $.ajax({
            url:"/goods/removeGood",//删除一调用car.js里的removegood方法，传一个对象（params里面有uid和goodid）
            data:params,
            success:cb
        })           
    },
    // addOrder:function(params,cb){
    //     console.log(params,99999)
    //     $.ajax({
    //         // type:'post',
    //         url:"/order/wait",
    //         data:params,
    //         success:cb
    //     });
    // },
    addEvent:function(){
        let that = this
        $(".goods").delegate(".add-btn","click",function(e){
            let inp = this
            var user_info = $.cookie("user_info")?JSON.parse($.cookie("user_info")):{}
            if(user_info.uid){//登陆验证成功后传入用户id和商品id
                that.addGood({uid:user_info.uid,goodid:$(this).data('id')},function(results){
                    console.log(results)
                    let $img = $(inp).parents('.thumbnail').find('img')                   
                    $img.removeClass("jello")
                    setTimeout(function () {//给浏览器提个醒
                        $img.addClass("jello")
                    },100)
                })
            }else{
                alert('请登陆后操作')
                window.location.href="/login"
            }
            
        })
     // $("goods").on("webkitAnimationEnd",'.thumbnail img',function(){
        //     $(this).removeClass("jello")
        // })//添加完类名后会自动去掉   不能委托  所以只能采取第一种方法
       
    }
}

