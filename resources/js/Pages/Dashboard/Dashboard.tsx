import { Head } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Restaurant } from "@/types/restaurant";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import MessageStatus from "@/Components/restaurant-message-status/MessageStatus";
import ServicesStatus from "@/Components/restaurant-message-status/ServicesStatus";
import MissingInfoRestaurant from "@/Components/MissingInfoRestaurant";

import ErrorMustBeFondator from "@/Components/fondator/message-error-must-be-fondator";
import Stats from "./Partials/Stats";
import ServiceOfToday from "./Partials/ServiceOfToday";

type DashboardProps = PageProps & {
    restaurants: Restaurant[];
    restaurant: {
        data: Restaurant;
    };
    isMissingInfo: boolean;
};

const Dashboard = ({
    auth,
    flash,
    restaurants,
    restaurant: resto,
    isMissingInfo,
}: DashboardProps) => {
    const restaurant = resto.data;
    const user = auth.user as User;
    const now = new Date();
    const time = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(
        now,
    );

    return (
        <>
            <Head title={`Dashboard de ${restaurant.name}`} />
            <MissingInfo
                isMissingInfo={isMissingInfo}
                restaurant={restaurant}
                user={user}
            />

            <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="md:h-48 w-full rounded-md border bg-secondary md:w-2/3">
                    <div className="flex flex-col items-center gap-2 py-8">
                        <h1 className="text-4xl font-extrabold lg:text-6xl">
                            {time}
                        </h1>
                        <p className="text-lg font-medium capitalize lg:text-xl">
                            {date}
                        </p>
                        <p>Restaurant : {restaurant.name}</p>
                    </div>
                </div>
                <ServiceOfToday restaurant={restaurant} />
            </div>
            <h2 className="text-xl font-bold">Vos statistiques du mois </h2>
            <Stats restaurant={restaurant} />
        </>
    );
};

Dashboard.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;

const MissingInfo = ({
    isMissingInfo,
    restaurant,
    user,
}: {
    isMissingInfo: boolean;
    restaurant: Restaurant;
    user: User;
}) => {
    return (
        <>
            {isMissingInfo && <MissingInfoRestaurant restaurant={restaurant} />}

            {!isMissingInfo && (
                <>
                    {restaurant.active &&
                    restaurant.accept_messages &&
                    restaurant.accept_reservations &&
                    restaurant.services.length > 0 &&
                    user?.isFondator ? null : (
                        <div className="space-y-1.5 rounded-lg border bg-primaryBlue/20 p-4 md:col-start-3">
                            <RestaurantStatus restaurant={restaurant} />
                            <MessageStatus restaurant={restaurant} />
                            <ReservationStatus restaurant={restaurant} />
                            <ServicesStatus restaurant={restaurant} />
                            {!user?.isFondator && (
                                <ErrorMustBeFondator
                                    classNames="bg-background/60 justify-between"
                                    message="Votre niveau d'abonnement ne vous permet pas de profiter pleinement de nos services."
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};
