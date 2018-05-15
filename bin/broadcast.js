

let broadcast = {//整成对象

    broad(info){//这个方法能接收到clientMap
        for(let id in this.clientMap){
            this.clientMap[id].send(info)//找到client之后  send
        }
    }

}

module.exports =  broadcast