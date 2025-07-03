import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized, login again" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ set it on req.userId instead of req.body
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
