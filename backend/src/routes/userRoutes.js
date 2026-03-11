const express=require('express');
const router=express.Router();
const {createUser,getUser}=require('../controllers/user/userController');
const {createStudent}=require('../controllers/user/studentController');
const {createWarden}=require('../controllers/user/wardenController');
const {createGuard}=require('../controllers/user/securityController');
const validateToken=require('../middleware/validateToken');

router.post('/createUser',createUser);
router.post('/createWarden',createWarden);
router.post('/createStudent',createStudent);
router.post('/createGuard',createGuard);
router.get('/me',validateToken,getUser);

module.exports=router;