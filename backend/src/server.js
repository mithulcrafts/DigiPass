const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");
app.use(express.json()); //Built in middleware for passing JSON in post request

app.use(errorHandler); //Always place it "below" the route where you wanted to use
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
