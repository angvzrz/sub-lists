import React from 'react';
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
import { Input } from '../ui/input';

type DialogWrapperProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  dialogTitle: string;
  dialogDescription: string;
  dialogAction: () => void;
};

export function DialogWrapper({
  children,
  inputRef,
  dialogTitle,
  dialogDescription,
  dialogAction,
}: React.PropsWithChildren<DialogWrapperProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex w-80 flex-col gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-6">
            {dialogDescription}
            <div className="flex flex-col gap-2">
              <Input ref={inputRef} placeholder="Choose a title" />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full flex-1">
          <AlertDialogCancel className="flex-1 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={dialogAction}
            className="flex-1 cursor-pointer"
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
