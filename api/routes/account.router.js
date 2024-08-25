const router = require('express').Router();
const accountCtrl = require('../controller/account.controller');
const authUser = require('../middleware/auth.middleware');              

router.get("/chekBalance", authUser, accountCtrl.checkBalance);  
router.post("/transferBalance", authUser, accountCtrl.transferBalance);


module.exports = router;