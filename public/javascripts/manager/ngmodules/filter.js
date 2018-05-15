

angular.module("filter",[])
.filter("firstUpper",function () {
    return function (data) {
        
        return data.substr(0,1).toUpperCase()+data.substr(1).toLowerCase()

    }
})