const constants=require('../constants/constants');
errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({"Title":"Validation Error",
                "message":err.message,
                "stackTrack":err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({"Title":"UNAUTHORIZED",
                "message":err.message,
                "stackTrack":err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({"Title":"FORBIDDEN",
                "message":err.message,
                "stackTrack":err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({"Title":"NOT FOUND",
                "message":err.message,
                "stackTrack":err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({"Title":"Server Error",
                "message":err.message,
                "stackTrack":err.stack
            });
            break;
        default:
            console.log("No Error, All good !!");
            break;
    }
}
module.exports=errorHandler;