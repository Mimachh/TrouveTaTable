import { create } from 'zustand';

interface useAddAdminReservationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  restaurantId: string | null;
  serviceId: number | null;
  date: Date | string | null;
  time: string | null;

  setRestaurantId: (restaurantId: string) => void;
  setServiceId: (serviceId: number) => void;
  setDate: (date: Date | string) => void;
  setTime: (time: string) => void;
}

import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

export const useAddAdminReservationModal = createSelectors(create<useAddAdminReservationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, restaurantId: null, serviceId: null, date: null, time: null}),

  restaurantId: null,
  serviceId: null,
  date: null,
  time: null,

  setRestaurantId: (restaurantId) => set({ restaurantId }),
  setServiceId: (serviceId) => set({ serviceId }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
})));