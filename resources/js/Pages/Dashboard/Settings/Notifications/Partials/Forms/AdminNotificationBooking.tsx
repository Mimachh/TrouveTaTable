import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Switch } from "@/Components/ui/switch";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface AdminNotificationBookingFormProps {
    restaurant: Restaurant;
    loading: boolean;
    setLoading: (value: boolean) => void;
    can: {
        enable_notifications_after_booking_restaurant: boolean;
    };
}
const AdminNotificationBooking = (props: AdminNotificationBookingFormProps) => {
    const { restaurant, loading, setLoading, can } = props;

    const [enable, setEnable] = useState<boolean>(
        restaurant.is_notify_restaurant_after_booking
    );

    const [errors, setErrors] = useState({
        is_notify_restaurant_after_booking: "",
    });

    const submit = (e: boolean) => {
        if(!can.enable_notifications_after_booking_restaurant)  {
            toast.error("Vous n'avez pas la permission de modifier ce paramètre");
            return;
        }
        setLoading(true);
        setErrors({
            is_notify_restaurant_after_booking: "",
        });

        axios
            .put(route(`dashboard.settings.notifications.notify-after-booking-restaurant`, {restaurant: restaurant.id}), {
                is_notify_restaurant_after_booking: e,
            })
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

    return (
        <div className="space-y-3">
            <h2 className="font-semibold leading-7 text-lg text-muted-foreground">
                Notifications du restaurant
            </h2>
            <FormFieldLayout
                label="Être notifié lors d'une réservation ?"
                description={`Un mail sera envoyé au ${restaurant.email} lorsqu'une réservation sera effectuée.`}
                fieldName="is_notify_restaurant_after_booking"
                className="flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0"
                error={errors?.is_notify_restaurant_after_booking ?? ""}
            >
                <Switch
                    checked={enable}
                    disabled={loading || !can.enable_notifications_after_booking_restaurant}
                    onCheckedChange={(e) => {
                        if(!can.enable_notifications_after_booking_restaurant)  {
                            toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                            return;
                        }
                        setEnable(() => {
                            submit(e);
                            return e;
                        });
                    }}
                />
            </FormFieldLayout>
        </div>
    );
};

export default AdminNotificationBooking;