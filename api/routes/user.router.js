const router = require('express').Router();
const userCtrl = require('../controller/user.controller');


 router.post('/createUser', userCtrl.createUser);
 router.post('/login', userCtrl.login);
 router.get('/logout', userCtrl.logout);


module.exports = router