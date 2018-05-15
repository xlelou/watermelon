//全局变量用于在更改类型或者排序规则后获取数据的时候使用
var classid = null
var order = null
var keyword = null
var pageNum = 1 //控制页数 默认第一页
var pageSize = 4//控制每页几个
$(".goods").delegate(".type-btn","click",function(e){
 
     //当切换类型的时候，不需要关键字搜索
    keyword = null
    $("#search-inp").val('')


    $(".type-btn").removeClass('btn-primary').addClass("btn-info") //控制样式
    $(this).removeClass('btn-info').addClass("btn-primary")

   
    if($(this).data('id')==classid){ //获取到此按钮代表的classid
        return ;//如果他们俩相等，说明用户点击是同一个，没有改变
    }//如果两次点击是相同的type,阻止下面代码运行，不重新获取
    classid = $(this).data('id')//相当于$(this).attr("data-id")attr可以获取到标签上的属性值，
                                //如果属性名是data-什么开头的，就可以用.data()这个方法来取
                                //classid为零，代表全部
    pageNum = 1//当切换类型的时候回到第一页
    getGoods()
    
})
 
//给价格和人气排序
$(".goods").delegate(".order-btn","click",function (e) {
    //更改样式
    $(".order-btn").removeClass("btn-danger").addClass("btn-info")
    $(this).removeClass("btn-info").addClass("btn-danger")

    //1.获取到此按钮代表的order
    if($(this).data('order')==order){//如果点击的还是同一个按钮的时候，取消排序
        $(this).removeClass("btn-danger").addClass("btn-info")//重置样式
        order=null
    }else{
        order = $(this).data('order')//$(this).attr("data-id")
    }
    pageNum = 1//当切换排序规则的时候回到第一页
    //classid为0代表全部，
    getGoods()
 
})

$("#search-inp").keyup(function (e) {
    if(e.keyCode==13){
        keyword = this.value
        pageNum = 1//当搜索的时候回到第一页
        getGoods()
    }
})

$("#prev").click(function () {
    if(pageNum>1){
        pageNum--;
        getGoods()
    }else{
        alert('已经是第一页了')
    }
})

$("#next").click(function () {
    pageNum++;
    getGoods()
})

function getGoods(){
    $.ajax({
        url:"/goods/getGoodsInList",
        data:{classid:classid,order:order,keyword:keyword,pageNum:pageNum,pageSize:pageSize},
        success:function (results) { 
            if(results.length==0){//如果数据为空，说明是最后一页
                pageNum--;//页码回退
                alert('已经是最后一页了')
                return ;
            }            
            showGoods(results)
           
        }
    })
}



function showGoods(results){//渲染数据 (列表页)
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
            $("#pagenum").html(pageNum)//当页面渲染后 更改页面展示
}