import { AuthRouter } from "./routes/auth";
import { PlaylistsRouter } from "./routes/playlist";
import { SongsRouter } from "./routes/song";

export const ROUTES = [
  {
    path: "/songs",
    router: SongsRouter,
  },
  {
    path: "/playlists",
    router: PlaylistsRouter,
  },
  {
    path: "/auth",
    router: AuthRouter,
  },
];
