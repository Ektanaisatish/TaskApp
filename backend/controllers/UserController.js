import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../model/User.js";
import { setUser } from "../services/Authentication.js";
//get all user
export const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  //if user not logged in
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  //user loggedin
  return res.status(200).json({ users });
};
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    //find with existinguser's email
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exit !login instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ user });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  //if email is wrong or user is not exits
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by your email" });
  }
  //convert into hash password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  //by token existinguser is authorized
  const token = setUser(existingUser);
  return res.json({ token,user:existingUser }
  );
  // return res.redirect("/");
  return res
    .status(200)
    .json({ message: "Login  Successfully", user: existingUser });
};