const express=require('express');
const router=express.Router();
const validateToken = require('../middleware/validateToken');
const {getStudent,getStudentById}=require('../controllers/user/studentController');
const authorizeRoles=require('../middleware/authorizeRoles');
router.get('/me',validateToken,authorizeRoles("student"),getStudent);
router.get('/:id',validateToken,authorizeRoles("student","warden","guard","admin"),getStudentById);
module.exports=router;