const throwError = (statusCode,message,res) => {
    res.status(statusCode);
    throw new Error (message);
}
module.exports=throwError