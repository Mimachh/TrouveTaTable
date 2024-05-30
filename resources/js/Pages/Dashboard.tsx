import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Restaurant } from "@/types/restaurant";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { Check, X } from "lucide-react";

type DashboardProps = PageProps & {
    restaurants: Restaurant[];
    restaurant: {
        data: Restaurant;
    };
};
const Dashboard = ({
    auth,
    flash,
    restaurants,
    restaurant: resto,
}: DashboardProps) => {
    const restaurant = resto.data;
    return (
        <>
            <Head title={`Dashboard de ${restaurant.name}`} />
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
                <div className="md:col-start-3 bg-secondary border rounded-lg p-4 space-y-1.5">
                    <MessageOption restaurant={restaurant} />
                    <ReservationOption restaurant={restaurant} />
                    <ServicesOption restaurant={restaurant} />
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

const MessageOption = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.accept_messages ? (
                <SuccessOption message="Le module de contact en ligne est activé" />
            ) : (
                <DangerOption message="Le module de contact en ligne est désactivé" />
            )}

            <Link
                className="text-sm text-primaryBlue underline"
                href={route("dashboard.messages.index", {
                    restaurant: restaurant.id,
                })}
            >
                Modifier
            </Link>
        </div>
    );
};

const ReservationOption = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.accept_reservations ? (
                <SuccessOption message="Le module de réservation en ligne est activé" />
            ) : (
                <DangerOption message="Le module de réservation en ligne est désactivé" />
            )}

            <Link
                className="text-sm text-primaryBlue underline"
                href={route("dashboard.reservation.index", {
                    restaurant: restaurant.id,
                })}
            >
                Modifier
            </Link>
        </div>
    );
};

const ServicesOption = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.services.length === 0 ? (
                <DangerOption message="Aucun horaire n'est indiqué" />
            ) : (
                <SuccessOption message="Des horaires d'ouverture sont indiqués" />
            )}

            <Link
                className="text-sm text-primaryBlue underline"
                href={route("dashboard.hours.index", {
                    restaurant: restaurant.id,
                })}
            >
                Modifier
            </Link>
        </div>
    );
};
const SuccessOption = ({ message }: { message: string }) => {
    return (
        <p className="flex items-center gap-1">
            <span className="bg-green-200 rounded-full p-1">
                <Check className="w-4 h-4 text-green-700" />
            </span>
            {message}
        </p>
    );
};

const DangerOption = ({ message }: { message: string }) => {
    return (
        <p className="flex items-center gap-1">
            <span className="p-1 bg-destructive rounded-full">
                <X className="w-4 h-4 text-muted" />
            </span>
            {message}
        </p>
    );
};
