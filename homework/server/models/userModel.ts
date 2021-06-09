import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.pre("save", async function (this: any, next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export async function login(email: string, password: string) {
  const user = User.findOne({ email });

  if (!user) {
    throw new Error("User not exists");
  } else {
    const isValid = await bcrypt.compareSync(password, user.password);
    if (isValid) {
      return user;
    } else {
      throw new Error("Provided credentials are not valid");
    }
  }
}

export default User;
