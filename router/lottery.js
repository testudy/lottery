const router = require('koa-router')();
const controller = require('../controller/lottery');


router.get('/', controller.index);


module.exports = router;