import { getUser } from "../services/Authentication.js";

export async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split("Bearer ")[1];
    const user = await getUser(token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authorization middleware:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// import jwt from 'jsonwebtoken';
// import { getUser } from "../services/Authentication.js";

// const secretKey = "your_secret_key"; // Use a secure key for signing the token

// export async function restrictToLoggedinUserOnly(req, res, next) {
//   const authHeader = req.headers["authorization"];
  
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     const user = await getUser(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized access" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }
