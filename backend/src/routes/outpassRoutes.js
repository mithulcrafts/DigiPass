const express=require('express');
const router=express.Router();
const {createOutpass}=require('../controllers/outPassController');
const validateToken=require('../middleware/validateToken');
const authorizeRoles=require('../middleware/authorizeRoles');
router.post('/createOutpass',validateToken,authorizeRoles("student"),createOutpass);
module.exports=router;
