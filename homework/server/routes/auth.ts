import express from "express";
import * as yup from "yup";
import { IRegisterPayload } from "../interface";
import User from "../models/userModel";

export const AuthRouter = express.Router();

let authPayloadSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullname: yup.string().required(),
});

AuthRouter.post("/register", async (req, res) => {
  const registerPayload: IRegisterPayload = req.body;
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

AuthRouter.post("/login", (req, res) =>
  res.json({
    token: "verysupertoken",
  })
);
