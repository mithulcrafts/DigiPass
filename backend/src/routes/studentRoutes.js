const express=require('express');
const router=express.Router();
const validateToken = require('../middleware/validateToken');
const {getStudent}=require('../controllers/user/studentController');
router.get('/me',validateToken,getStudent);
module.exports=router;