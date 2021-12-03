import create from 'zustand';

interface GlobalStore {
  uploadedImage: Blob | null;
  setUploadedImage: (file: Blob) => void;
  clearUploadedImage: () => void;
}

export const useStore = create<GlobalStore>((set) => ({
  uploadedImage: null,
  setUploadedImage: (img: Blob) => {
    set(() => ({ uploadedImage: img }));
  },
  clearUploadedImage: () => {
    set(() => ({ uploadedImage: null }));
  },
}));
