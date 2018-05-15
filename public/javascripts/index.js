//console.log(document.cookie)



//点击分类显示不同类别的商品

//给good绑定一个事件，delegate相当于on,委托给type-btn,添加click事件，回调函数里写干了什么事
var goods_cache = {}//做缓存
$(".goods").delegate(".type-btn","click",function(e){
    //控制样式
    $(".type-btn").removeClass('btn-primary').addClass("btn-info")
    $(this).removeClass('btn-info').addClass("btn-primary")
    //alert(1)
    //获取到此按钮代表的classid
    let classid = $(this).data('id')//相当于$(this).attr("data-id")attr可以获取到标签上的属性值，
    //如果属性名是data-什么开头的，就可以用.data()这个方法来取
    if(Date.now()-goods_cache.time > 10000){//每次读取缓存前看看时间有没有很长，如果缓存已经存在很长事件了，就清掉
        goods_cache = []
    }
    if(goods_cache[classid]){
        showGoods(goods_cache[classid])//看看缓存里有没有，有的话就直接用
    }else{
        $.ajax({
        url : "/goods/getGoods",
        data : {classid:classid},
        success : function(results){ //把缓存存起来
            goods_cache.time = Date.now()
            goods_cache[classid] = results
            console.log(results)//已经获取到数据 现在要循环拼接   
            showGoods(results)
            }
        })
    }
})
    
function showGoods(results){
     let str = ''
            results.forEach((item,i)=>{
                str +=`
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="thumbnail">
                        <img class="animated" src="${item.imgurl}" title="${item.name}" >
                        <div class="caption">
                            <h3>${item.name}</h3>
                            <p>￥：${item.price} 人气：${item.hot}</p>
                            <p>
                            <button data-id="${item._id}" class="add-btn btn btn-danger" >加入购物车</button> 
                            </p>
                        </div>
                        </div>
                  </div>
                `
            })

            $(".goods .row").html(str)
}

