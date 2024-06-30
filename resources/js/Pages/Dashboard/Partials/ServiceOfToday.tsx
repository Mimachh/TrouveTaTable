import { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { Reservation } from "@/types/reservation";
import { Services } from "@/types/services";
import axios from "axios";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";
import { formatTime } from "@/lib/format-time";
import {
    ChefHat,
    LoaderCircle,
} from "lucide-react";
import { getSelectedDayIndex } from "@/lib/format-day";
import { findServicesByDayId } from "@/lib/find-services-by-day-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

interface ListReservationProps {
    restaurant: Restaurant;
}

interface FormattedReservation {
    count: number;
    reservations: Reservation[];
    service: Services;
}
const ServiceOfToday = ({ restaurant }: ListReservationProps) => {
    const [reservations, setReservations] = useState<FormattedReservation[]>(
        [],
    );
    const [loading, setLoading] = useState<boolean>(true);

    const today = startOfToday();

    const selectedDayIndex = getSelectedDayIndex(today);
    const servicesSelectedDay = findServicesByDayId(
        selectedDayIndex,
        restaurant,
    );

    const getReservations = () => {
        setReservations([]);
        setLoading(true);
        const todayFormatted = format(today, "dd-MM-yyyy", { locale: fr });

        axios
            .get(
                route("dashboard.get.reservation.count.by.date", {
                    restaurant: restaurant.id,
                    date: todayFormatted,
                }),
            )
            .then((response) => {
                if (
                    !response.data.data.reservations ||
                    response.data.data.reservations.length === 0
                ) {
                    // console.log("Aucune réservation pour cette date");
                } else {
                    // console.log(response.data.data);
                    setReservations(response.data.data.reservations);
                }
            })
            .catch((error) => {
                toast.error(
                    "Une erreur est survenue lors de la récupération des réservations",
                );
                // console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getReservations();
    }, []);

    return (
        <section className="w-full md:w-1/3">
            <Card className="bg-secondary min-h-48">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Services(s) du jour
                    </CardTitle>
                    <ChefHat className="h-6 w-6 stroke-[0.75] text-muted-foreground" />
                </CardHeader>
                <CardContent className="mt-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="flex flex-wrap items-center justify-around">
                            {servicesSelectedDay ? (
                                servicesSelectedDay.map((service, index) => {
                                    const endTimeParts = formatTime(
                                        service.end_time,
                                    ).split("h");
                                    const endTime = new Date();
                                    endTime.setHours(parseInt(endTimeParts[0]));
                                    endTime.setMinutes(
                                        parseInt(endTimeParts[1]),
                                    );

                                    return (
                                        <div key={service.id} className="">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="font-medium text-muted-foreground">
                                                        {service.name}
                                                    </h2>
                                                    <small className="tracking-tighter">
                                                        {formatTime(
                                                            service.start_time,
                                                        )}{" "}
                                                        -{" "}
                                                        {formatTime(
                                                            service.end_time,
                                                        )}
                                                    </small>
                                                </div>
                                            </div>

                                            {reservations[service.id] &&
                                            reservations[service.id].count >
                                                0 ? (
                                                <p>
                                                    {
                                                        reservations[service.id]
                                                            .count
                                                    }{" "}
                                                    réservation(s)
                                                </p>
                                            ) : (
                                                <p>
                                                    Pas de réservations pour ce
                                                    service.
                                                </p>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <>Fermé</>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default ServiceOfToday;

const Loading = () => {
    return (
        <div className="flex h-fit w-full items-center justify-center">
            <LoaderCircle className="animate h-8 w-8 animate-spin" />
        </div>
    );
};
