import cors from "cors";
import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ROUTES } from "./routes";

dotenv.config();

const uri = process.env.MONGO_URI || "";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("db connected"));

const app = expres();
app.use(cors());
app.use(expres.json());

const port = 8000;

ROUTES.forEach(({ path, router }) => {
  app.use(path, router);
});

app.listen(port, () => {
  console.log(`server started`);
});
