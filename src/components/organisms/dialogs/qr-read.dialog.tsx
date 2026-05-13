import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';
import dialogStore from '@/stores/dialog.store';
import { QRCode } from 'react-qr-code';

const QrReadDialog = () => {
  const { getDialog, closeDialog } = dialogStore(),
    dialog = getDialog('qr_read');

  const _close = () => {
    if (dialog) closeDialog(dialog.id);
  };

  return (
    <Dialog
      open={!!dialog}
      onOpenChange={(s) => {
        if (!s) _close();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Scanner</DialogTitle>
        </DialogHeader>

        <div className="no-scrollbar max-h-[70vh] overflow-y-auto">
          {dialog && (
            <>
              <div className="p-4">
                <QRCode value={dialog.meta.content} className="size-full" />
              </div>
              <p className="text-base-content/60 mt-4 text-center">
                {dialog.meta.content}
              </p>
            </>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QrReadDialog;
