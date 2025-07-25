import jwt, { decode } from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  //extract token from authorization header
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.token(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorization" });
    req.userId = decoded.id;
    next();
  });
};
export default authMiddleware;
