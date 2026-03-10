const express=require('express');
const router=express.Router();
const {createUser}=require('../controllers/user/userController');
const {createStudent}=require('../controllers/user/studentController');
const {createWarden}=require('../controllers/user/wardenController');
const {createGuard}=require('../controllers/user/securityController');

router.post('/createUser',createUser);
router.post('/createWarden',createWarden);
router.post('/createStudent',createStudent);
router.post('/createGuard',createGuard);

module.exports=router;