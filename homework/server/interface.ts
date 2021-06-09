export interface IPlaylist {
  _id: string;
  name: string;
  songs: Array<{
    _id: number;
  }>;
}

export interface ISong {
  _id: string;
  name: string;
  artist: string;
  mediaUrl: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
}
