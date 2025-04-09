const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const passwordGen = require("../utils/passwordGen");
const { sendNewPassword } = require("../utils/sendEmailLostPass");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");


const authMiddleware = require("../middlewares/auth.middleware");
const { addToBlacklist } = require("../utils/accessTokenBlacklist");

const Joi = require('joi');
// User Joi schema
const UserSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/auth/signup", async (req, res) => {
  try {
    const { error } = UserSchema.validate(req.body);
    if (error) 
      return res.status(400).json({ message: error.details[0].message });
    if (process.env.SEQUELIZE !== "yes") 
      return res.status(200).json({ message: "MySQL2 no implemented yet!" });
    const isUser = await UserModel.findOne({ where: { email: req.body.email } });
    if (isUser) 
      return res.status(400).json({ message: "user exists!" });
    const user = await UserModel.create({
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });
    res.status(201).json({ message: "User created!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Create User Error" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) 
      return res.status(400).json({ message: "email and password required!" });
    if (process.env.SEQUELIZE !== "yes") 
      return res.status(200).json({ message: "MySQL2 no implemented yet!" });
    const isUser = await UserModel.findOne({ where: { email } });
    if (!isUser) 
      return res.status(400).json({ message: "user not exists!" });
    if (!bcrypt.compareSync(password, isUser.password)) 
      return res.status(400).json({ message: "incorrect password!" });
    const accessToken = jwt.sign({ payload: { id: isUser.id, email } }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User Login successful!", accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login User Error" });
  }
});

router.get("/auth/private", authMiddleware, async (req, res) => {
  res.json({ message: `Private Route. Welcome! Email: ${req.user.payload.email}, ID: ${req.user.payload.id}` })
});

// TODO: signout & lost-password routes
router.post("/auth/signout", authMiddleware, async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    addToBlacklist(accessToken);
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login User Error" });
  }
});

router.post("/auth/lost-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) 
      return res.status(400).json({ message: "email required!" });
    if (process.env.SEQUELIZE !== "yes") 
      return res.status(200).json({ message: "MySQL2 no implemented yet!" });
    const isUser = await UserModel.findOne({ where: { email } });
    if (!isUser) 
      return res.status(400).json({ message: "user not exists!" });
    const newPassword = passwordGen(6);
    // nodemailer
    await sendNewPassword(email, newPassword);
    // insert mysql bcrypt
    isUser.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await isUser.save();
    res.status(200).json({ message: "New password generated. Check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login User Error" });
  }
});

module.exports = router;