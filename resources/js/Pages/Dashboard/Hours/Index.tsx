import HoursModal from "@/Components/modales/HoursModal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Day, FormatedDayAndHour } from "@/types/days";
import { Restaurant } from "@/types/restaurant";
import React from "react";
import SelectTamponService from "./Partials/SelectTamponService";
import OpeningHours from "./Partials/OpeningHours";
import StopReservation from "./Partials/StopReservation";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    days: {
        data: Day[];
    };

    hours: FormatedDayAndHour[];
    can: {
        deleteRestaurantService: boolean;
    };
};

const Hours = ({ restaurant: resto, auth, days, hours, can }: Props) => {
    const restaurant = resto.data;
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState<number | null>();
    const [dayName, setDayName] = React.useState<string>("");
    const [loadingModal, setLoadingModal] = React.useState(false);

    const openForm = (id: number, name: string) => {
        setOpen(true);
        setLoadingModal(true);
        setId(id);
        setDayName(name);
    };

    const closeModal = () => {
        setOpen(false);
        setLoadingModal(false);
        setId(null);
        setDayName("");
    };
    return (
        <>
            <HoursModal
                title={`Modifier les horaires du ${dayName}`}
                description=""
                isOpen={open}
                onClose={closeModal}
                loading={loadingModal}
                setLoading={setLoadingModal}
                id={id}
                restaurant={restaurant}
                can={can}
            />

            <div className="md:grid md:grid-cols-3 gap-3 space-y-2 md:space-y-0">
                <OpeningHours openForm={openForm} days={days} hours={hours} />
                <div className="space-y-2">
                    <SelectTamponService restaurant={restaurant} />
                    <StopReservation restaurant={restaurant} />
                </div>
            </div>
        </>
    );
};

Hours.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Hours;
