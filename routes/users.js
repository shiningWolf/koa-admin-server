const router = require('koa-router')()
const db = require('../db')
router.prefix('/dev-api/vue-admin-template')

router.get('/user/login', async function (ctx, next) {
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

router.get('/branchmanage/list', async function (ctx, next) {
  try {
    let result = await db.search('branches');
    ctx.body = {
      code:20000,
      data:result
    }
  } catch(e) {
    ctx.body = {
      code:500
    }
  }
})

router.post('/branchmanage/create', async function (ctx, next) {
  let body = ctx.request.body;
  console.log('body',typeof body,body)
  try {
    let result = await db.insert('branches',body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:500
    }
  }
})

router.post('/branchmanage/update', async function (ctx, next) {
  let body = ctx.request.body;
  let id = body._id;
  delete body._id;
  try {
    let result = await db.update('branches',id,body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:500
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
      code:500
    }
  }
})

module.exports = router
