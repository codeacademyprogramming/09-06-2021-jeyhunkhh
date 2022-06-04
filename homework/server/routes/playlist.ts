import express, { Request, Response } from "express";
import cors from "cors";
import Playlist from "../models/playlistModel";
import { IPlaylist, ISong } from "../interface";

export const PlaylistsRouter = express.Router();

PlaylistsRouter.use(cors());

// get
PlaylistsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getById
PlaylistsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
PlaylistsRouter.post("/", async (req: Request, res: Response) => {
  const playlistsPayload: IPlaylist = {
    ...req.body,
  };
  const playlist = new Playlist(playlistsPayload);
  try {
    const newPlaylist = await playlist.save();
    res.status(200).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
PlaylistsRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Not found" });
    } else {
      await Playlist.findByIdAndUpdate(id, req.body, {
        useFindAndModify: true,
      });
      playlist = await Playlist.findById(id);
      res.json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
PlaylistsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Not found" });
    } else {
      await playlist.remove();
      res.json({ message: "Deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply song
PlaylistsRouter.post("/:id/atendee", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ message: "Not found" });
    } else {
      const song: ISong = req.body;
      await Playlist.updateOne(
        { _id: id },
        {
          $addToSet: { songs: song },
        }
      );
      playlist = await Playlist.findById(id);
      res.json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
