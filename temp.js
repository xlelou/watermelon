
var MongoClient = require('mongodb').MongoClient;
    
    // Connection URL
    var url = 'mongodb://localhost:27017/latiao';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {//db就是 latiao库对象
        
        db.collection("users").insertOne({
            username:Math.floor(Math.random()*100),
            password:Math.floor(Math.random()*100),
            nickname:Math.floor(Math.random()*100),
        },(err,results)=>{
            console.log(err)
            console.log(results)
        })
        
         db.close();//断开连接
    });