import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";
// define the store
let CartPageStore = (set, get) => ({
  CartPageStoreObject: [],
  addCartPage: (paylaod) =>
    set(
      produce((draft) => {
        draft.CartPageStoreObject.push(paylaod);
      }),
    ),
  removeCartPage: (payload) =>
    set(
      produce((draft) => {
        const cartIndex = draft.CartPageStoreObject.findIndex(
          (el) => el.id === payload?.id && el.qty > 0,
        );
        draft.CartPageStoreObject[cartIndex].qty -= 1;
        if (draft.CartPageStoreObject[cartIndex].qty === 0) {
          draft.CartPageStoreObject.slice(cartIndex, 1);
        }
      }),
    ),
});

CartPageStore = devtools(CartPageStore, {});

export const useCartPageStore = create(CartPageStore);
export default useCartPageStore;
