

const SendProd=(res,err)=>{
  if(err.isOperational)
  {
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message


    })
  }
  else{
    res.status(500).json({
      status:"error",
      meesage:"something went wrong"

    })
  }
}
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // In development, send the full error stack trace
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.stack,
      stack:err.stack,
    });
  } 
  else if(process.env.NODE_ENV === 'production')
  {
    let error={...err};
    SendProd(res,error);
  }
  };
