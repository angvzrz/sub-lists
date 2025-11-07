'use client';

import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function NewPlaylistDialog() {
  const titleInputRef = useRef(null);
  const urlInputRef = useRef(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-transparent hover:cursor-pointer">
          Create new playlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex w-80 flex-col gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>New playlist</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-6">
            Enter the playlist details below.
            <div className="flex flex-col gap-2">
              <Input ref={titleInputRef} placeholder="Choose a title" />
              <Input ref={urlInputRef} placeholder="Write the video url" />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full flex-1">
          <AlertDialogCancel className="flex-1 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="flex-1 cursor-pointer">
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
