import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Switch } from "@/Components/ui/switch";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface ClientNotificationBookingFormProps {
    restaurant: Restaurant;
    loading: boolean;
    setLoading: (value: boolean) => void;
    can: {
        enable_notifications_day_before_booking_user: boolean;
        enable_notifications_after_booking_user: boolean;
    };
}
const ClientNotificationBooking = (
    props: ClientNotificationBookingFormProps
) => {
    const { restaurant, loading, setLoading, can } = props;

    const [enable, setEnable] = useState<boolean>(
        restaurant.is_notify_client_after_booking
    );
    const [errors, setErrors] = useState({
        is_notify_client_after_booking: "",
    });

    const [enableDayBefore, setEnableDayBefore] = useState<boolean>(
        restaurant.is_notify_client_a_day_before_booking
    );
    const [errorsDayBefore, setErrorsDayBefore] = useState({
        is_notify_client_a_day_before_booking: "",
    });


    const submit = (e: boolean) => {
        if (!can.enable_notifications_after_booking_user) {
            toast.error(
                "Vous n'avez pas la permission de modifier ce paramètre"
            );
            return;
        }
        setLoading(true);
        setErrors({
            is_notify_client_after_booking: "",
        });

        axios
            .put(
                route(
                    `dashboard.settings.notifications.notify-after-booking-client`,
                    { restaurant: restaurant.id }
                ),
                {
                    is_notify_client_after_booking: e,
                }
            )
            .then((response) => {
                // console.log(response);
                toast.success("Statut modifié !");
            })
            .catch((error) => {
                toast.error(
                    "Une erreur est survenue, veuillez réessayer plus tard"
                );
                setErrors(error.response.data.errors);
                // console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const submitDayBefore = (e: boolean) => {
        if (!can.enable_notifications_day_before_booking_user) {
            toast.error(
                "Vous n'avez pas la permission de modifier ce paramètre"
            );
            return;
        }
        setLoading(true);
        setErrorsDayBefore({
            is_notify_client_a_day_before_booking: "",
        });

        axios
            .put(
                route(
                    `dashboard.settings.notifications.notify-day-before-booking-client`,
                    { restaurant: restaurant.id }
                ),
                {
                    is_notify_client_a_day_before_booking: e,
                }
            )
            .then((response) => {
                // console.log(response);
                toast.success("Statut modifié !");
            })
            .catch((error) => {
                toast.error(
                    "Une erreur est survenue, veuillez réessayer plus tard"
                );
                setErrors(error.response.data.errors);
                // console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className="space-y-3">
            <h2 className="font-semibold leading-7 text-lg text-muted-foreground">
                Notifications des clients
            </h2>
            <FormFieldLayout
                label="Notifier le client après sa réservation ?"
                description={`Un mail sera envoyé au mail du client lorsqu'il aura effectué une réservation.`}
                fieldName="is_notify_client_after_booking"
                className="flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0"
                error={errors?.is_notify_client_after_booking ?? ""}
            >
                <Switch
                    disabled={
                        loading || !can.enable_notifications_after_booking_user
                    }
                    checked={enable}
                    onCheckedChange={(e) => {
                        if (!can.enable_notifications_after_booking_user) {
                            toast.error(
                                "Vous n'avez pas la permission de modifier ce paramètre"
                            );
                            return;
                        }
                        setEnable(() => {
                            submit(e);
                            return e;
                        });
                    }}
                />
            </FormFieldLayout>

            <FormFieldLayout
                label="Envoyer un rappel au client ?"
                description={`Un mail sera envoyé au mail du client la veille de sa réservation, pour lutter contre les no-shows.`}
                fieldName="is_notify_client_a_day_before_booking"
                className="flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0"
                error={errorsDayBefore?.is_notify_client_a_day_before_booking ?? ""}
            >
                <Switch
                    disabled={
                        loading || !can.enable_notifications_day_before_booking_user
                    }
                    checked={enableDayBefore}
                    onCheckedChange={(e) => {
                        if (!can.enable_notifications_day_before_booking_user) {
                            toast.error(
                                "Vous n'avez pas la permission de modifier ce paramètre"
                            );
                            return;
                        }
                        setEnableDayBefore(() => {
                            submitDayBefore(e);
                            return e;
                        });
                    }}
                />
            </FormFieldLayout>
        </div>
    );
};

export default ClientNotificationBooking;
