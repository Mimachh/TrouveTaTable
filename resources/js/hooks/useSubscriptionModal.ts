import { Product } from "@/types";
import { create } from "zustand";
import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S
) => {
    let store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (let k of Object.keys(store.getState())) {
        (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
    }

    return store;
};
export type RecurrenceType = 'monthly' | 'annually';
interface useSubscriptionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    product: Product;
    setProduct: (product: Product) => void;
    recurrence: RecurrenceType;
    setRecurrence: (recurrence: RecurrenceType) => void;
}

export const useSubscriptionModal = createSelectors(
    create<useSubscriptionModalStore>((set) => ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
        product: {} as Product,
        setProduct: (product: Product) => set({ product }),
        recurrence: "monthly",
        setRecurrence: (recurrence: RecurrenceType) => set({ recurrence }),
    }))
);
