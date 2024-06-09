import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";
import React, { useState } from "react";
import CanNotUseBooking from "./Partials/CanNotUseBooking";
import CanNotUseMessages from "./Partials/CanNotUseMessages";
import { useForm } from "@inertiajs/react";
import AdminNotificationBooking from "./Partials/Forms/AdminNotificationBooking";
import ClientNotificationBooking from "./Partials/Forms/ClientNotificationBooking";
import AdminNotificationMessages from "./Partials/Forms/AdminNotificationMessages";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    can: {
        enable_notifications_after_booking_user: boolean;
        enable_notifications_day_before_booking_user: boolean;
        enable_notifications_after_booking_restaurant: boolean;
        enable_notifications_contact_message_restaurant: boolean;
    };
};

const Notifications = (props: Props) => {
    const { can, restaurant } = props;

    const [loading, setLoading] = useState<boolean>(false);


    return (
        <div>
            <h1 className="text-4xl font-semibold tracking-wide p-2">
                Gérer les notifications du restaurant : {restaurant.data.name}
            </h1>

            <div className="space-y-3">
                <Card
                    x-chunk="settings-notifications-restaurant"
                    className="bg-accent"
                >
                    <CardHeader className="px-7">
                        <CardTitle>Notifications de réservations</CardTitle>
                        <CardDescription>
                            Gérez les notifications liées à votre module de
                            réservation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!restaurant.data.can.accept_booking ? (
                            <CanNotUseBooking restaurant={restaurant.data} />
                        ) : (
                            <div className="md:grid md:grid-cols-2 md:gap-7 bg-background/30 rounded-md p-2">
                                <div>
                                    <AdminNotificationBooking
                                        restaurant={restaurant.data}
                                        loading={loading}
                                        setLoading={setLoading}
                                        can={can}
                                    />
                                </div>
                                <div>
                                    <ClientNotificationBooking 
                                      restaurant={restaurant.data}
                                      loading={loading}
                                      setLoading={setLoading}
                                      can={can}
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card
                    x-chunk="settings-notifications-restaurant"
                    className="bg-accent"
                >
                    <CardHeader className="px-7">
                        <CardTitle>
                            Notifications du formulaire de contact
                        </CardTitle>
                        <CardDescription>
                            Gérez les notifications liées à votre formulaire de
                            contact.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!restaurant.data.can.accept_messages ? (
                            <CanNotUseMessages restaurant={restaurant.data} />
                        ) : (
                            <div className="md:grid md:grid-cols-2 md:gap-7 bg-background/30 rounded-md p-2">
                                <AdminNotificationMessages
                                    restaurant={restaurant.data}
                                    loading={loading}
                                    setLoading={setLoading}
                                    can={can}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

Notifications.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Notifications;


