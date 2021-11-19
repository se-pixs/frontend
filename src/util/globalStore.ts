import create from 'zustand';

interface GlobalStore {
  uploadedImage: File | null;
  setUploadedImage: (file: File) => void;
  clearUploadedImage: () => void;
}

export const useStore = create<GlobalStore>((set) => ({
  uploadedImage: null,
  setUploadedImage: (img: File) => {
    set(() => ({ uploadedImage: img }));
  },
  clearUploadedImage: () => {
    set(() => ({ uploadedImage: null }));
  },
}));
