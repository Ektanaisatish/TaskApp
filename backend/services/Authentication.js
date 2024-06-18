import jwt from "jsonwebtoken";
const secret = "Ekta@123$4";
export function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}
export function getUser(token) {
  if (!token) return null;
  try {
    //verify token to secret key
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

//     getUser,
//     setUser
// };
