const INVALID_PARAMETERS = {
  errorType: "INVALID_PARAMETERS",
  message: "Invalid parameters provided.",
};

const UNAUTHORISED = {
  errorType: "UNAUTHORISED",
  errorMessage: "You are unauthorised to perform this action",
};

const UNAUTHENTICATED = {
  errorType: "UNAUTHENTICATED",
  errorMessage: "You are unauthenticated to perform this action",
};

const AUTHENTICATED = {
  errorType: "AUTHENTICATED",
  errorMessage: "No need to authenticate again.",
};

const INTERNAL_SERVER_ERROR = {
  errorType: "INTERNAL_SERVER_ERROR",
  message: "Internal server error.",
};

export {
  INTERNAL_SERVER_ERROR,
  INVALID_PARAMETERS,
  UNAUTHORISED,
  UNAUTHENTICATED,
  AUTHENTICATED,
};
