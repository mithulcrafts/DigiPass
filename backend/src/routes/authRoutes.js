const express=require('express');
const router=express.Router();
const {signin}=require('../controllers/authController');

router.post("/",signin);

module.exports=router;