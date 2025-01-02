const errorHandler = (statusCode = 500, message) => {
    // Find the matching error details from errorMessages
    const errorDetails = Object.values(errorMessages).find(
      (err) => err.statusCode === statusCode
    );
  
    if (!errorDetails) {
      return JSON.stringify({
        error: {
          statusCode: statusCode,
          message: message || "Unknown Error",
          description: "No description available.",
          moreInfo: "http://api.docs/errors/default",
        },
      });
    }
  
    // Use details from errorMessages, overriding message if provided
    return JSON.stringify({
      error: {
        statusCode: statusCode,
        message: message || errorDetails.message,
        description: errorDetails.description,
        moreInfo: errorDetails.moreInfo,
      },
    });
  };
  
  module.exports = { errorHandler };