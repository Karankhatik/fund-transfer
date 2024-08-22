const router = require('express').Router();

const user = require('./user.router');
const account = require('./account.router');

router.use('/user', user);
router.use('/account', account);

module.exports = router