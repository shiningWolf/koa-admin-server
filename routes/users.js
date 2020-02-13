const router = require('koa-router')()
const db = require('../db')
router.prefix('/dev-api/vue-admin-template')

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

module.exports = router
