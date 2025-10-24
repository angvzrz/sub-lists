export type Playlist = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  subPlaylists?: Playlist[];
  videos?: PlaylistVideo[];
};

export type PlaylistVideo = {
  id: string;
  title: string;
  playlistId: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
};
