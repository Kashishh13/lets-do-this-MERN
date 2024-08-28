const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Auth token required" });
    }

    jwt.verify(token, "kg1309", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authToken };
