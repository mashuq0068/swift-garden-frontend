/* eslint-disable @typescript-eslint/no-explicit-any */

import create from "zustand";

interface ILoadingStore {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

const useLoadingStore = create<ILoadingStore>((set:any) => ({
  loading: false,
  setLoading: (status: boolean) => {
    set({ loading: status });
    if (status) {
      document.getElementsByTagName("html")[0].classList.add("overflow-hidden");
    } else {
      document.getElementsByTagName("html")[0].classList.remove("overflow-hidden");
    }
  },
}));

export default useLoadingStore;
