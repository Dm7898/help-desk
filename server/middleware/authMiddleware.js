import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export const admin = (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied, admin only" });
  }
  next();
};

export const agentOrAdmin = (req, res, next) => {
  if (req.role !== "Admin" && req.role !== "Agent") {
    return res
      .status(403)
      .json({ msg: "Access denied, agents and admins only" });
  }
  next();
};
