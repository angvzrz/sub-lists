import { Params } from 'next/dist/server/request/params';
import { ReadonlyURLSearchParams } from 'next/navigation';

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

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};
