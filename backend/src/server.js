const express = require("express");
const app = express();
require("dotenv").config();
const cors=require("cors");
const PORT = process.env.PORT || 3000;
const connectDB=require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const outpassRoutes=require('./routes/outpassRoutes');
const studentRoutes=require('./routes/studentRoutes');
const logRoutes=require('./routes/logRoutes');
const adminRoutes=require('./routes/adminRoutes');

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));
app.use(express.json()); //Built in middleware for passing JSON in post request
connectDB(); //To connect with Database

app.use('/api/signIn',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/outpass',outpassRoutes);
app.use('/api/log',logRoutes);
app.use('/api/admin',adminRoutes);
app.use(errorHandler); //Always place it "below" the route where you wanted to use
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
