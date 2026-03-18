const express=require('express');
const router=express.Router();
const {createOutpass,getOutpasses}=require('../controllers/outPassController');
const validateToken=require('../middleware/validateToken');
const authorizeRoles=require('../middleware/authorizeRoles');

router.post('/createOutpass',validateToken,authorizeRoles("student"),createOutpass);
router.get('/getOutpasses',validateToken,authorizeRoles("student"),getOutpasses);
module.exports=router;
