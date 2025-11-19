'use client';

import { useRef } from 'react';
import { DialogWrapper } from './dialog-wrapper';
import { Button } from '../ui/button';
import { MUTATIONS } from '@/db/queries';

type NewVideoDialogProps = Readonly<{
  playlistId: string;
}>;

export function NewVideoDialog({ playlistId }: NewVideoDialogProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleCreateVideo = () => {
    if (!urlInputRef.current || !titleInputRef.current || !playlistId) return;
    const title = titleInputRef.current.value;
    const url = urlInputRef.current.value;
    // For simplicity, we use placeholder value for channel.
    const channel = 'Sample Channel Name';

    MUTATIONS.createPlaylistVideo({
      playlistId,
      url,
      title,
      channel,
    });
  };

  return (
    <DialogWrapper
      titleInputRef={titleInputRef}
      urlInputRef={urlInputRef}
      dialogTitle="New video"
      dialogDescription="Enter the video details below."
      dialogAction={handleCreateVideo}
    >
      <Button className="bg-transparent hover:cursor-pointer">Add video</Button>
    </DialogWrapper>
  );
}
