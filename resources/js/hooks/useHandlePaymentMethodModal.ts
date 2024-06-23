import { Restaurant } from '@/types/restaurant';
import { create } from 'zustand';
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


interface useHandlePaymentMethodModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useHandlePaymentMethodModal = createSelectors(create<useHandlePaymentMethodModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})));

