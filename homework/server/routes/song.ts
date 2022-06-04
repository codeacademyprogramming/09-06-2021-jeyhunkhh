import express, { Request, Response } from "express";
import cors from "cors";
import Song from "../models/songModel";
import { ISong } from "../interface";

export const SongsRouter = express.Router();

SongsRouter.use(cors());

// get
SongsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getById
SongsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(song);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
SongsRouter.post("/", async (req: Request, res: Response) => {
  const songPayload: ISong = {
    ...req.body,
  };
  const song = new Song(songPayload);
  try {
    const newSong = await song.save();
    res.status(200).json(newSong);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
SongsRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let songs = await Song.findById(id);
    if (!songs) {
      res.status(404).json({ message: "Not found" });
    } else {
      await Song.findByIdAndUpdate(id, req.body, {
        useFindAndModify: true,
      });
      songs = await Song.findById(id);
      res.json(songs);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
SongsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ message: "Not found" });
    } else {
      await song.remove();
      res.json({ message: "Deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
