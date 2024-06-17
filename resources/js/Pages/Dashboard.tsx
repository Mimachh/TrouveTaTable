import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Restaurant } from "@/types/restaurant";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import AlertBanner from "@/Components/AlertBanner";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import MessageStatus from "@/Components/restaurant-message-status/MessageStatus";
import ServicesStatus from "@/Components/restaurant-message-status/ServicesStatus";
import MissingInfoRestaurant from "@/Components/MissingInfoRestaurant";
import Error from "@/Components/restaurant-message-status/Messages/Error";
import { useUser } from "@/hooks/useUser";
import ErrorMustBeFondator from "@/Components/fondator/message-error-must-be-fondator";

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
    const user = useUser.use.user()
    return (
        <>
            <Head title={`Dashboard de ${restaurant.name}`} />
            {isMissingInfo && (
                <MissingInfoRestaurant restaurant={restaurant} />
            )}

            {!isMissingInfo && (
                <div className="md:col-start-3 bg-primaryBlue/20 border rounded-lg p-4 space-y-1.5">
                    <RestaurantStatus restaurant={restaurant} />
                    <MessageStatus restaurant={restaurant} />
                    <ReservationStatus restaurant={restaurant} />
                    <ServicesStatus restaurant={restaurant} />
                    {!user?.isFondator && (<ErrorMustBeFondator 
                    classNames="bg-background/60 justify-between"
                    message="Votre niveau d'abonnement ne vous permet pas de profiter pleinement de nos services." />)}
                </div>
            )}
            <div className="flex items-center justify-start gap-4">
                <h1 className="text-4xl ">Dashboard de {restaurant.name}</h1>
                <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-full"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-2">
                <div className="md:col-span-2 bg-secondary">
                    Jour actuel, heure, prochain service + lien
                </div>
            </div>
            <div className="w-full h-80 border rounded bg-secondary/80 text-secondary-foreground stroke-current relative">
                <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8 absolute top-4 right-4" />
            </div>
            <div className="flex flex-row gap-5 w-full">
                <div className="h-60 w-1/2 bg-secondary/80 border rounded" />
                <div className="h-60 w-1/2 bg-secondary/80 border rounded" />
            </div>
        </>
    );
};

Dashboard.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;










