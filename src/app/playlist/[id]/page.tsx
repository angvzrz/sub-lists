import { PlaylistView } from '../../../components/playlist/playlist-view';
import { BackButton } from '@/components/playlist/back-button';

export default async function ListPage({
  params,
}: PageProps<'/playlist/[id]'>) {
  const routeParams = await params;
  const playlistId = routeParams.id;

  return (
    <main className="container mx-auto p-4">
      <BackButton />
      <PlaylistView playlistId={playlistId} />
    </main>
  );
}
