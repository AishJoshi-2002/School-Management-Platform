const jwt = require("jsonwebtoken");

function authenticateJWT (req, res, next)  {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: "Forbidden"});
    }
}

module.exports = authenticateJWT;