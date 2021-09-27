const jwt = require("jsonwebtoken");
const privateKey = process.env.ACCESS_TOKEN_SECRET;

// middleware function to check if the incoming request is authenticated
exports.checkAuth = (req, res, next) => {
    // get the token stored in the custom header called "x-auth-token"
    const token = req.get("x-auth-token");

    // send error message if no token is found

}