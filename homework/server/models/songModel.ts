import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
