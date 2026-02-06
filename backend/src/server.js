const express=require('express');
const errorHandler=require('./middleware/errorHandler');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT||3000;
app.use(errorHandler());
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})