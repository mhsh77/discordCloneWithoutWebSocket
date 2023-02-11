const ErrorHandler = require('../utilites/errorHandler');
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies
    if(!token){
        next(new ErrorHandler('Login first to access this recourse',401))
    }
    //console.log('tokenis ',token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    //console.log(decoded);
    req.user = await User.findById(decoded.id);
    next()
})
//Handling users roles
exports.authorizedRoles = (...roles) => {
    return (req,res,next) => {
        //console.log('user',req.user);
        if(!roles.includes(req.user.role)) {

            next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this content`,403))
        }
        next()
    }
    
}