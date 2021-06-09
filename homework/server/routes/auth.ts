import express from "express";
import * as yup from "yup";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IAuthPayload } from "../interface";
import User, { login } from "../models/userModel";

export const AuthRouter = express.Router();

dotenv.config();

let authPayloadSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullname: yup.string(),
});

const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

AuthRouter.post("/register", async (req, res) => {
  const registerPayload: IAuthPayload = req.body;
  try {
    const validPayload = await authPayloadSchema.validate(registerPayload);

    const newUserObj = new User(validPayload);
    const newUser = await newUserObj.save();

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      createdAt: newUser.createdAt,
    });
  } catch (err) {
    res.status(422).json({ errors: err.errors });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const loginPayload: IAuthPayload = req.body;
  try {
    const validPayload = await authPayloadSchema.validate(loginPayload);

    try {
      const user = await User.findOne({ email: validPayload.email });
      const token = jwt.sign(
        { _id: user._id, fullname: user.fullname },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token });
    } catch (err) {
      res.status(422).json({ errors: err.message });
    }
  } catch (err) {
    res.status(422).json({ errors: err.errors });
  }
});
