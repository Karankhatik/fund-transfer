const router = require('express').Router();
const userCtrl = require('../controller/user.controller');
const authUser = require('../middleware/auth.middleware');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/getUser', authUser, userCtrl.getUser);
router.get('/getAllUser', authUser, userCtrl.getAllUsers);

module.exports = router