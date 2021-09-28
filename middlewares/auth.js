
const httpStatus = require("http-status");
const { tokenService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const auth = () => catchAsync(async (req, res, next) => {

  try {
    const decoded = tokenService.verifyToken(req.headers.token)
    req.userId = decoded.sub;
    next();
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Token");
  }

});


module.exports = auth;
