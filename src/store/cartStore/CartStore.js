import create from "zustand";
import produce from "immer";
import { persist, devtools } from "zustand/middleware";
// define the store
let cartStore = (set) => ({
  previewState: {},
  showPreview: (payload) => set((state) => {}),
  addCarts: (paylaod) =>
    set(
      produce((draft) => {
        // draft.CartState.push(paylaod);
        draft.previewState = paylaod;
      }),
    ),

  removeCart: (payload) =>
    set(
      produce((draft) => {
        // const cartIndex = draft.CartState.findIndex((el) => el.id === payload);
        // draft.CartState.splice(cartIndex, 1);
      }),
    ),
});

cartStore = devtools(cartStore, {});
cartStore = persist(cartStore, {
  name: "preview",
});
export const useCartStore = create(cartStore);
export default useCartStore;
