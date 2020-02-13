
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
}
const db = new DB();
module.exports = db;