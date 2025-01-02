const errorMessages = {
    ROUTE_NOT_FOUND: {
      statusCode: 404,
      message: "Not found",
      description:
        "The requested route ID does not exist or requested resource could not be found.",
      moreInfo: "http://api.docs/errors/404",
    },
    INTERNAL_SERVER_ERROR: {
      statusCode: 500,
      message: "Internal Server Error",
      description: "An unexpected error occurred on the server.",
      moreInfo: "http://api.docs/errors/500",
    },
    UNAUTHORIZED: {
      statusCode: 401,
      message: "Unauthorized",
      description: "You are not authorized to perform this action.",
      moreInfo: "http://api.docs/errors/401",
    },
    FORBIDDEN: {
      statusCode: 403,
      message: "Forbidden",
      description:
        "You do not have sufficient permissions to access this resource.",
      moreInfo: "http://api.docs/errors/403",
    },
    BAD_REQUEST: {
      statusCode: 400,
      message: "Bad Request",
      description:
        "The request could not be understood or was missing required parameters.",
      moreInfo: "http://api.docs/errors/400",
    },
    NOT_FOUND: {
      statusCode: 404,
      message: "Not Found",
      description: "The requested resource could not be found.",
      moreInfo: "http://api.docs/errors/404",
    },
    CONFLICT: {
      statusCode: 409,
      message: "Conflict",
      description:
        "The request could not be completed due to a conflict with the current state of the resource.",
      moreInfo: "http://api.docs/errors/409",
    },
  };
  
  module.exports = errorMessages;
  