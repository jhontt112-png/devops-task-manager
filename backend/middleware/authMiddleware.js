const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("1. Full Header:", authHeader); // Check if Bearer is there

  const token = authHeader && authHeader.split(" ")[1];
  console.log("2. Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Check if your .env variable is actually loading
    console.log("3. Secret Key check:", process.env.JWT_SECRET ? "Exists" : "MISSING");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("4. JWT Error Type:", err.name); // Will show 'TokenExpiredError' or 'JsonWebTokenError'
    res.status(401).json({ message: "Invalid token" });
  }
};