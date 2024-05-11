import { Reservation } from "@/types/reservation";
import axios from "axios";
import { create } from "zustand";

interface useShowReservationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    setReservationId: (id: number | null) => void;
    reservationId: number | null;

    loading: boolean;
    setLoading: (loading: boolean) => void;

    reservation: Reservation | null;
    setReservation: (reservation: Reservation | null) => void;

    restaurantId: string | null;
    setRestaurantId: (id: string | null) => void;

    status: string[];
    setStatus: (status: string[]) => void;

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


export const useShowReservationModal = createSelectors(create<useShowReservationModalStore>(
    (set) => ({
        isOpen: false,
        onOpen: () => {
            set({ loading: true });
            set({ isOpen: true });
        },
        onClose: () => {
            set({ isOpen: false });
        },
        restaurantId: null,
        setRestaurantId: (id: string | null) => set({ restaurantId: id }),
        
        status: [],
        setStatus: (status: string[]) => set({ status }),
        setReservationId: (id: number | null) => {
            set({ reservationId: id });
            set(({ restaurantId }) => {
                if (id !== null) {
                    axios
                        .get(`/${restaurantId}/reservation/${id}`)
                        .then((response) => {
                            console.log(response)
                            set({ reservation: response.data.data.reservation });
                            set({ status: response.data.data.reservationStatus });
                        })
                        .catch((error) => {
                            console.error(error);
                        }).then(() => {
                            set({ loading: false });
                        });
                }
                return { reservationId: id };
            });
        },
        reservationId: null,

        loading: false,
        setLoading: (loading: boolean) => set({ loading }),

        reservation: null,
        setReservation: (reservation: Reservation | null) =>
            set({ reservation }),
    })
));
