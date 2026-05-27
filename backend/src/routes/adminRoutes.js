const express=require('express');
const router=express.Router();
const authorizeRoles=require('../middleware/authorizeRoles');
const validateToken=require('../middleware/validateToken');
const {getStats}=require('../controllers/user/adminController');

router.get('/stats',validateToken,authorizeRoles("admin"),getStats);

module.exports=router;