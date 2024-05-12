import { Restaurant } from "@/types/restaurant";
import { Table } from "@/types/tables";
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

interface useUpdateTableStore {
    openForm: boolean;
    setOpenForm: (openForm: boolean) => void;

    table: Table | null;
    setTable: (table: Table | null) => void;

    restaurant: Restaurant | null;
    setRestaurant: (restaurant: Restaurant | null) => void;
}

export const useUpdateTable = createSelectors(
    create<useUpdateTableStore>((set) => ({
        openForm: false,
        setOpenForm: (openForm) => set({ openForm }),

        table: null,
        setTable: (table) => set({ table }),

        restaurant: null,
        setRestaurant: (restaurant) => set({ restaurant }),
    }))
);
