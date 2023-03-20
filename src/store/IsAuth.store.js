import create from "zustand";
import produce from "immer";
import { persist, devtools } from "zustand/middleware";
let IsAuthStore = (set) => ({
  IsAuth: false,
  setIsAuthStatus: (paylaod) =>
    set(
      produce((draft) => {
        // draft.CartState.push(paylaod);
        draft.IsAuth = paylaod;
      }),
    ),
});

IsAuthStore = devtools(IsAuthStore, {});
IsAuthStore = persist(IsAuthStore, { name: "IsAuth" });
export const useIsAuthStore = create(IsAuthStore);
export default useIsAuthStore;
