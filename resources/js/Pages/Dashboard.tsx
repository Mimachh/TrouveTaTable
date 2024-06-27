import { Head, Link } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Restaurant } from "@/types/restaurant";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import MessageStatus from "@/Components/restaurant-message-status/MessageStatus";
import ServicesStatus from "@/Components/restaurant-message-status/ServicesStatus";
import MissingInfoRestaurant from "@/Components/MissingInfoRestaurant";

import ErrorMustBeFondator from "@/Components/fondator/message-error-must-be-fondator";

type DashboardProps = PageProps & {
    restaurants: Restaurant[];
    restaurant: {
        data: Restaurant;
    };
    isMissingInfo: boolean;
    stats: {
        reservation_percentage: number | null;
        guests_percentage: number | null;
        reservation_month: number | null;
        guests_month: number | null;
    }
};
const Dashboard = ({
    auth,
    flash,
    restaurants,
    restaurant: resto,
    isMissingInfo,
    stats
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
      

            <div className="grid gap-2 md:grid-cols-3">
                <div className="bg-secondary md:col-span-1">
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
                <div className="bg-secondary md:col-span-2">
                    Service du jour : 
                </div>
            </div>
            <div className="relative h-80 w-full rounded border bg-secondary/80 stroke-current text-secondary-foreground">
                <ChartBarIcon className="absolute right-4 top-4 w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                Nombre de réservation du mois : {stats.reservation_month} 
                - poucentage : {stats.reservation_percentage}% par rapport au mois précédent
            </div>
            <div className="relative h-80 w-full rounded border bg-secondary/80 stroke-current text-secondary-foreground">
                <ChartBarIcon className="absolute right-4 top-4 w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                Nombre de couverts du mois {stats.guests_month}
                - poucentage : {stats.guests_percentage}% par rapport au mois précédent
            </div>

            <div className="flex w-full flex-row gap-5">
                <div className="h-60 w-1/2 rounded border bg-secondary/80" />
                <div className="h-60 w-1/2 rounded border bg-secondary/80" />
            </div>
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
    );
};
