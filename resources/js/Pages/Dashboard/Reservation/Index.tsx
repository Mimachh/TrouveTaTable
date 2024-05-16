import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import CalendarReservation from "./Partials/CalendarReservation";
import ListOfReservation from "./Partials/ListOfReservation";
import { Restaurant } from "@/types/restaurant";
import { startOfToday } from "date-fns";
import { useState } from "react";
import { getSelectedDayIndex } from "@/lib/format-day";
import { findServicesByDayId } from "@/lib/find-services-by-day-id";

type DashboardReservationProps = PageProps & {
    restaurant: {
        data: Restaurant;
    };
};

const Index = ({ auth, restaurant }: DashboardReservationProps) => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const selectedDayIndex = getSelectedDayIndex(selectedDay);
    const servicesSelectedDay = findServicesByDayId(
        selectedDayIndex,
        restaurant.data
    );

    return (
        <>
            <h1 className="text-4xl font-semibold tracking-wide p-2">
                Réservations
            </h1>
            <div className="md:grid md:grid-cols-3 p-1 md:divide-x md:divide-background-foreground">
                <div className="md:col-span-2">
                    <CalendarReservation
                        today={today}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                    />
                </div>
                <ListOfReservation
                    selectedDay={selectedDay}
                    restaurant={restaurant.data}
                    servicesSelectedDay={servicesSelectedDay}
                />
            </div>
        </>
    );
};

Index.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Index;
