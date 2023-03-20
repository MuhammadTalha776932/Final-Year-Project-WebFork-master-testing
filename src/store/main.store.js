import create from "zustand";
import produce from "immer";
import { persist, devtools } from "zustand/middleware";
let PaymentStore = (set) => ({
  payment: {},
  paymentStatus: (paylaod) =>
    set(
      produce((draft) => {
        // draft.CartState.push(paylaod);
        draft.payment = paylaod;
      }),
    ),
});

PaymentStore = devtools(PaymentStore, {});
export const usePaymentStore = create(PaymentStore);
export default usePaymentStore;
