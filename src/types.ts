import { Params } from 'next/dist/server/request/params';
import { ReadonlyURLSearchParams } from 'next/navigation';

export type Playlist = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  subPlaylists?: string[];
  videos?: string[];
};

export type PlaylistVideo = {
  id: string;
  playlistId: string;
  url: string;
  title: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
};

export type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};
