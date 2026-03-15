const express=require('express');
const router=express.Router();
const {createOutpass}=require('../controllers/outPassController');
const validateToken=require('../middleware/validateToken');
router.post('/createOutpass',validateToken,createOutpass);
module.exports=router;
