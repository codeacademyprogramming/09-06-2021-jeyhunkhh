import cors from "cors";
import expres from "express";
import mongoose from "mongoose";
import { PlaylistsRouter } from "./routes/playlist";
import { SongsRouter } from "./routes/song";

const uri =
  "mongodb+srv://Proshop:123698741@cluster0.mevuu.mongodb.net/music?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("db connected"));

const app = expres();
app.use(cors());
app.use(expres.json());

app.use("/playlists", PlaylistsRouter);
app.use("/songs", SongsRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`server started`);
});
