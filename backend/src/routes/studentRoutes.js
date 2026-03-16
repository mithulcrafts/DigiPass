const express=require('express');
const router=express.Router();
const validateToken = require('../middleware/validateToken');
const {getStudent}=require('../controllers/user/studentController');
const authorizeRoles=require('../middleware/authorizeRoles');
router.get('/me',validateToken,authorizeRoles("student"),getStudent);
module.exports=router;