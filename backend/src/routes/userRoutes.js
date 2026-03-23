const express=require('express');
const router=express.Router();
const {createUser,getUser,getUserById}=require('../controllers/user/userController');
const {createStudent}=require('../controllers/user/studentController');
const {createWarden}=require('../controllers/user/wardenController');
const {createGuard}=require('../controllers/user/securityController');
const validateToken=require('../middleware/validateToken');
const authorizeRoles=require('../middleware/authorizeRoles');

router.post('/createUser',validateToken,authorizeRoles('admin'),createUser);
router.post('/createWarden',validateToken,authorizeRoles('admin'),createWarden);
router.post('/createStudent',validateToken,authorizeRoles('admin'),createStudent);
router.post('/createGuard',validateToken,authorizeRoles('admin'),createGuard);
router.get('/me',validateToken,authorizeRoles("student","warden","guard","admin"),getUser);
router.get('/:id',validateToken,authorizeRoles("student","warden","guard","admin"),getUserById);
module.exports=router;