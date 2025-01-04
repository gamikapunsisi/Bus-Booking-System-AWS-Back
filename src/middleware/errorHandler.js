const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: isDevelopment ? err.message : undefined,
        stack: isDevelopment ? err.stack : undefined
    });
};

module.exports = errorHandler;