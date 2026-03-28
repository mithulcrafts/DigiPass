const express=require('express');
const router=express.Router();
const {createOutpass,getOutpasses,getOutpass,getAllOutpasses}=require('../controllers/outPassController');
const validateToken=require('../middleware/validateToken');
const authorizeRoles=require('../middleware/authorizeRoles');

router.post('/createOutpass',validateToken,authorizeRoles("student"),createOutpass);
router.get('/getOutpasses',validateToken,authorizeRoles("student"),getOutpasses);
router.get('/getOutpass/:id',validateToken,authorizeRoles("student","warden","admin","guard"),getOutpass);
router.get('/getAllOutpasses',validateToken,authorizeRoles("warden","admin"),getAllOutpasses);
module.exports=router;
