import { create } from 'zustand';

// generic dialog
export const DIALOGS = {
  qr_read: { id: 'qr_read' },
} as const;

export type DialogId = keyof typeof DIALOGS;

type DialogMetaMap = {
  qr_read: { content: string };
};

type DialogData<T extends DialogId = DialogId> =
  DialogMetaMap[T] extends undefined
    ? {
        id: T;
        meta?: undefined;
      }
    : {
        id: T;
        meta: DialogMetaMap[T];
      };

// confirmation dialog
type ConfirmDialogData = {
  title: string;
  description: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: 'default' | 'destructive';
};

interface DialogStoreState {
  // generic dialog
  dialogs: DialogData[];

  // confirmation dialog
  confirmDialog?: ConfirmDialogData;
}

interface DialogStoreAction {
  // generic dialog
  getDialog: <T extends DialogId>(id: T) => DialogData<T> | undefined;
  openDialog: <T extends DialogId>(
    ...args: DialogMetaMap[T] extends undefined
      ? [id: T]
      : [id: T, meta: DialogMetaMap[T]]
  ) => void;
  closeDialog: (id: DialogId) => void;

  // confirmation dialog
  openConfirmDialog: (data: ConfirmDialogData) => void;
  closeConfirmDialog: () => void;

  clear: () => void;
}

const dialogStoreInit: DialogStoreState = {
  dialogs: [],
  confirmDialog: undefined,
};

const dialogStore = create<DialogStoreState & DialogStoreAction>(
  (set, get) => ({
    ...dialogStoreInit,

    // generation dialog
    getDialog: <T extends DialogId>(id: T): DialogData<T> | undefined => {
      const dialog = get().dialogs.find((item) => item.id === id);
      return dialog as DialogData<T> | undefined;
    },
    openDialog: (...args) => {
      const [id, meta] = args as [DialogId, DialogMetaMap[DialogId]?];

      set({
        dialogs: [{ id, meta } as DialogData, ...get().dialogs],
      });
    },
    closeDialog: (id) => {
      set({ dialogs: [...get().dialogs].filter((m) => m.id != id) });
    },

    // confirmation dialog
    openConfirmDialog: (data) => {
      set({ confirmDialog: data });
    },
    closeConfirmDialog: () => {
      set({ confirmDialog: undefined });
    },

    clear: () => {
      set({ ...dialogStoreInit });
    },
  })
);

export default dialogStore;
