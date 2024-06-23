import { useEffect, useState } from "react";
import { endOfDay, format, isBefore, isSameDay, set } from "date-fns";
import { fr } from "date-fns/locale";
import { Reservation } from "@/types/reservation";
import { Services } from "@/types/services";
import axios from "axios";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";
import { formatTime } from "@/lib/format-time";
import { Skeleton } from "@/Components/ui/skeleton";
import { CalendarX, ExternalLink, Eye, Pen, Plus } from "lucide-react";
import { SeeReservation } from "@/Components/modales/SeeReservation";
import { Button } from "@/Components/ui/button";
import { useShowReservationModal } from "@/hooks/useShowReservationModal";
import { useAddAdminReservationModal } from "@/hooks/useAddAdminReservationModal";
import { AddAdminReservation } from "@/Components/modales/AddAdminReservation";
import { Separator } from "@/Components/ui/separator";
import { formatDateToIsoMidDay } from "@/lib/format-date-to-iso-mid-day";
import { useReservationAndResetAfterAdding } from "@/hooks/useReservationAndResetAfterAdding";
import { User } from "@/types";
import useToastErrorNotFondator from "@/hooks/fondator/useToastErrorNotFondator";

interface ListReservationProps {
    selectedDay: Date;
    user: User;
    restaurant: Restaurant;
    servicesSelectedDay: Services[] | null;
    can: {
        enableBookingForm: boolean;
    };
}

interface FormattedReservation {
    reservations: Reservation[];
    service: Services;
}
const ListOfReservation = ({
    selectedDay,
    restaurant,
    servicesSelectedDay,
    can,
    user,
}: ListReservationProps) => {
    const [reservations, setReservations] = useState<FormattedReservation[]>(
        [],
    );
    const [loading, setLoading] = useState<boolean>(true);

    const setRestaurantId = useShowReservationModal.use.setRestaurantId();
    const { showErrorToast } = useToastErrorNotFondator();
    const addAdminReservationModalOnOpen =
        useAddAdminReservationModal.use.onOpen();
    const addAdminReservationModalSetServiceId =
        useAddAdminReservationModal.use.setServiceId();
    const addAdminReservationModalSetRestaurantId =
        useAddAdminReservationModal.use.setRestaurantId();
    const addAdminReservationModalSetDate =
        useAddAdminReservationModal.use.setDate();
    const addAdminReservationModalSetTime =
        useAddAdminReservationModal.use.setTime();

    const getReservations = () => {
        setReservations([]);
        setLoading(true);
        axios
            .get(
                `/dashboard/${
                    restaurant.id
                }/reservation/getReservationsByDate/${format(
                    selectedDay,
                    "dd-MM-yyyy",
                    { locale: fr },
                )}`,
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

    const resetTheReservation = useReservationAndResetAfterAdding.use.reset();
    const setResetTheReservation =
        useReservationAndResetAfterAdding.use.setReset();
    useEffect(() => {
        if (resetTheReservation) {
            setResetTheReservation(false);
        }
        getReservations();
        setRestaurantId(restaurant.id);
    }, [selectedDay, resetTheReservation]);

    return (
        <section className="mt-12 md:mt-0 md:pl-14">
            <div className="w-full">
                <h2 className="text-base font-semibold leading-6 text-foreground">
                    <span>Réservation(s) </span>
                </h2>
                <time
                    dateTime={format(selectedDay, "EEEE dd MMMM yyyy", {
                        locale: fr,
                    })}
                    className="text-sm capitalize"
                >
                    {format(selectedDay, "EEEE dd MMMM yyyy", {
                        locale: fr,
                    })}
                </time>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {servicesSelectedDay ? (
                        servicesSelectedDay.map((service, index) => {
                            const endTimeParts = formatTime(
                                service.end_time,
                            ).split("h");
                            const endTime = new Date();
                            endTime.setHours(parseInt(endTimeParts[0]));
                            endTime.setMinutes(parseInt(endTimeParts[1]));

                            // Obtenir l'heure actuelle
                            const now = new Date();

                            const isPastDay = isBefore(
                                endOfDay(selectedDay),
                                now,
                            );
                            const isToday = isSameDay(new Date(), selectedDay);

                            return (
                                <div key={service.id} className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="font-medium text-muted-foreground">
                                                {service.name}
                                            </h2>
                                            <small className="tracking-tighter">
                                                {formatTime(service.start_time)}{" "}
                                                - {formatTime(service.end_time)}
                                            </small>
                                        </div>

                                        {!isPastDay &&
                                            (!isToday ||
                                                (isToday && now < endTime)) && (
                                                <Button
                                                    size={"xs"}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!user.isFondator) {
                                                            showErrorToast({
                                                                message:
                                                                    "Votre niveau d'abonnement ne vous permet pas de réaliser de réservation.",
                                                                action: "Mettre à niveau",
                                                            });
                                                            return;
                                                        }
                                                        if (
                                                            !can.enableBookingForm
                                                        ) {
                                                            toast.error(
                                                                "Vous n'avez pas la permission de faire une réservation",
                                                            );
                                                            return;
                                                        }

                                                        addAdminReservationModalSetDate(
                                                            selectedDay,
                                                        );
                                                        addAdminReservationModalSetRestaurantId(
                                                            restaurant.id,
                                                        );
                                                        addAdminReservationModalSetServiceId(
                                                            service.id,
                                                        );
                                                        addAdminReservationModalSetTime(
                                                            `${formatTime(service.start_time)}/${formatTime(service.end_time)}`,
                                                        );
                                                        addAdminReservationModalOnOpen();
                                                    }}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            )}
                                    </div>

                                    {reservations[service.id] &&
                                    reservations[service.id].reservations
                                        .length > 0 ? (
                                        <ol
                                            className="mt-4 space-y-1 text-sm leading-6"
                                            key={service.id}
                                        >
                                            {reservations[
                                                service.id
                                            ].reservations.map(
                                                (reservation) => (
                                                    <ReservationItem
                                                        key={reservation.id}
                                                        reservation={
                                                            reservation
                                                        }
                                                    />
                                                ),
                                            )}
                                        </ol>
                                    ) : (
                                        <p>
                                            Pas de réservations pour ce service.
                                        </p>
                                    )}
                                    {index !==
                                        servicesSelectedDay.length - 1 && (
                                        <Separator className="my-3" />
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <>Fermé</>
                    )}
                </>
            )}

            <SeeReservation restaurant={restaurant} />

            {can.enableBookingForm && user.isFondator && (
                <AddAdminReservation />
            )}
        </section>
    );
};

export default ListOfReservation;

const Loading = () => {
    return (
        <div className="mt-4 space-y-5">
            <div className="space-y-2">
                <Skeleton className="h-5 w-[60px]" />
                <Skeleton className="h-5 w-[100px]" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
};

const ReservationItem = ({ reservation }: { reservation: Reservation }) => {
    const setReservationId = useShowReservationModal.use.setReservationId();
    const reservationModalOnOpen = useShowReservationModal.use.onOpen();
    return (
        <li
            key={reservation.id}
            className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-muted hover:bg-muted"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted group-hover:bg-background">
                <CalendarX className="h-5 w-5" />
            </div>
            <div className="flex-auto">
                <p className="font-semibold tracking-wide text-foreground">
                    {reservation.last_name} - Table: {reservation.table.name}
                </p>
                <p className="mt-0.5 tracking-tight text-muted-foreground">
                    <time dateTime={reservation.time}>
                        {formatTime(reservation.time)}
                    </time>
                    <span> Pour {reservation.guests} personne(s)</span>
                </p>
            </div>
            <Button
                onClick={() => {
                    setReservationId(reservation.id);
                    reservationModalOnOpen();
                }}
                size={"sm"}
                className="group-hover:bg-background"
                variant={"secondary"}
            >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Button>
        </li>
    );
};
