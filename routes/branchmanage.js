const router = require('./index')
const db = require('../db')
const ObjectID = require('mongodb').ObjectID;
const ERRCODE = 500;

console.log('branchmanage rub')

router.get('/branchmanage/list', async function (ctx, next) {
  try {
    let result = await db.search('branches');
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

router.post('/branchmanage/create', async function (ctx, next) {
  let body = ctx.request.body;
  try {
    let result = await db.insert('branches',body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

router.post('/branchmanage/update', async function (ctx, next) {
  let body = ctx.request.body;
  let id = body._id;
  delete body._id;
  try {
    let result = await db.update('branches',ObjectID(id),body);
    ctx.body = {
      code:20000
    }
  } catch(e) {
    ctx.body = {
      code:ERRCODE
    }
  }
})

router.post('/branchmanage/delete', async function (ctx, next) {
  let body = ctx.request.body;
  let id = body._id;
  try {
    await db.delete('branches',ObjectID(id));
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
