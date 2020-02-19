const router = require('./index')
const db = require('../db')
const ObjectID = require('mongodb').ObjectID;
const ERRCODE = 500;
router.prefix('/dev-api/vue-admin-template')

router.post('/user/login', async function (ctx, next) {
 ctx.body = {
   code:20000,
   data:{token: "admin-token"}
 }
})

router.get('/user/info', async function (ctx, next) {
  ctx.body = {
    code:20000,
    data: {
      "roles": [
        "admin"
      ],
      "introduction": "I am a super administrator",
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      "name": "Super Admin"
    }
  }
})

router.get('/user/logout', async function (ctx, next) {
  ctx.body = {
    code:20000,
    data: {
      ok:true
    }
  }
})


router.get('/problem/list', async function (ctx, next) {
  try {
    let result = await db.search('problem');
    ctx.body = {
      code:20000,
      data:result
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

router.post('/problem/create', async function (ctx, next) {
  let body = ctx.request.body;
  if(body.branchId){ //字符串变ObjectId
    body.branchId = ObjectID(body.branchId);
  }
  try {
    let branchIdList = body.branchIdList
    let branches = await db.search('branches')
    let names = []
    branches.forEach(v => {
      if (branchIdList.indexOf(v._id) > -1) {
        names.push(v.userId)
      }
    });
    await DH.sendEmail(names.join(','),body.name,body.type)
    await db.insert('problem',body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

router.post('/problem/update', async function (ctx, next) {
  let body = ctx.request.body;
  let id = body._id;
  delete body._id;
  if(body.branchId){ //字符串变ObjectId
    body.branchId = ObjectID(body.branchId);
  }
  if(Array.isArray(body.branchIdList) && body.branchIdList.length > 0){
    body.branchIdList = body.branchIdList.map(item => ObjectID(item));  //ID变为ObjectId  
  }
  try {
    await db.update('problem',ObjectID(id),body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

router.post('/problem/delete', async function (ctx, next) {
  let body = ctx.request.body;
  let id = body._id;
  try {
    await db.delete('problem',ObjectID(id));
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

module.exports = router
