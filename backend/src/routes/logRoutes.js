const express=require('express');
const router=express.Router();
const authorizeRoles=require('../middleware/authorizeRoles');
const validateToken=require('../middleware/validateToken');
const {getMovementStats}=require('../controllers/logController');

router.get("/movementStats",validateToken,authorizeRoles("warden","admin"),getMovementStats);

module.exports=router;