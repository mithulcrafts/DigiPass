const express=require('express');
const router=express.Router();
const {createOutpass}=require('../controllers/outPassController');

router.post('/createOutpass',createOutpass);
module.exports=router;
