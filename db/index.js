
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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

    insert(tableName,data){ //插入数据
        return new Promise((resolve,reject)=>{
            let dbo = this._db.db("runoob");
            dbo.collection(tableName).insertOne(data,(err,res)=>{
                if (err) {
                    reject()
                }else {
                    resolve()
                }
            })
        })
    }

    update(tableName,id,data){ //更新数据
        return new Promise((resolve,reject)=>{
            let dbo = this._db.db("runoob");
            let updateStr = {$set: data};
            dbo.collection(tableName).updateOne({_id:id},updateStr,(err,res)=>{
                if (err) {
                    console.log('update',err)
                    reject()
                }else {
                    resolve()
                }
            })
        })
    }

    delete(tableName,id){ //删除数据
        return new Promise((resolve,reject)=>{
            let dbo = this._db.db("runoob");
            dbo.collection(tableName).deleteOne({_id:id},(err)=>{
                if (err) {
                    reject()
                }else {
                    resolve()
                }
            })
        })
    }
}
const db = new DB();
module.exports = db;