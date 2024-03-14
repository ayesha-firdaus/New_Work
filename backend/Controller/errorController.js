const AppError = require("../Utils/Error");

const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}:${err.value}.`;
    return new AppError(message,404);
}
const handleDuplicateFeildDB=err=>{
   
    const message=`Duplicate feild value.Please use another value!`;
    return new AppError(message,400);
}
const handleValidationDB=err=>{
    const errors=Object.values(err.errors).map(el=>el.message);
    const message=`Invalid input data. ${errors.join('. ')}`;
    return new AppError(message,400);
}
const handleJWTError=()=>{
   return new AppError('Invalid Token please log in again',401);
}
const handleJWTExpiredError=()=>{
  return   new AppError("your Token has expired!.Please log in again",401)
}
const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    })
}
const  sendErrorProd=(err,res)=>{
    
    if(err.isOperational)
    {
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }
    else{
        console.log(err);
        res.status(500).json({
            status:'error',
            message:"Something went Wrong"
        });
    }
}
module.exports=(err,req,res,next)=>{;
  err.statusCode=err.statusCode||500;
  err.status=err.status||'error';
console.log(err)

  if(process.env.NODE_ENV.trim()==="development")
  {
     sendErrorDev(err,res);
  }
  else if(process.env.NODE_ENV.trim() === 'production'){
    let error={...err};
    console.log(error._message)
    if(error.name==="CastError")
    error=handleCastErrorDB(error);
    if (error?.code === 11000) error = handleDuplicateFeildDB(error);
  
    if (error?.name ==='ValidationError')
      error =  handleValidationDB(error);
    if(error && error._message === 'user validation failed'|| error._message === 'Validation failed'||error._message==='indent validation failed' )
    error =  handleValidationDB(error);
    if (error?.name?.trim() === 'JsonWebTokenError') error = handleJWTError();
    if (error?.name?.trim() === 'TokenExpiredError') error = handleJWTExpiredError();
    console.log(error,'💥')
    sendErrorProd(error,res);
  }

}

  