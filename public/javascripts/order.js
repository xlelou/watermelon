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
   

    addOrder:function(params,cd){
        $.ajax({
            // type:'post',
            url:"/order",
            data:params,
            success:cd
        });
    },
    addEvent:function(){
        let that = this
        $(".gopay").click(function(){
            let inp = this
            var user_info = $.cookie("user_info")?JSON.parse($.cookie("user_info")):{}
            if(user_info.uid){//登陆验证成功后传入用户id和商品id
                that.addOrder({uid:user_info.uid,goodid:$(this).data('id')},function(results){
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
        });
    }
}

