
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/runoob";
class DB{
    init(){
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db)=> {
            if (err) throw err;
            console.log("数据库已连接!");
            this._db = db;
        });
    }

    search(tableName,condition = {}){  //查询数据库
        return new Promise((reolve,reject)=>{
            let dbo = this._db.db("runoob");
            dbo.collection(tableName).find(condition).toArray(function(err, result) { // 返回集合中所有数据
                if (err) {
                    reject()
                }else{
                    reolve(result)
                }
            });
        })
    }
}
const db = new DB();
module.exports = db;