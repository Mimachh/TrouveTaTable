import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Restaurant } from "@/types/restaurant";
import { ChartBarIcon } from "@heroicons/react/24/outline";


type DashboardProps = PageProps & {
    restaurants: Restaurant[];
    restaurant: {
        data: Restaurant
    };
};
export default function Dashboard({ auth, flash, restaurants, restaurant: resto }: DashboardProps) {
 
    const restaurant = resto.data; 

  
    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="header-title">
                    <span className="text-primaryBlue">Da</span>shboard
                </h2>
            }
           
        >
            <Head title={`Dashboard de ${restaurant.name}`} />
                <div className="flex items-center justify-start gap-4">
                <h1 className="text-4xl ">Dashboard de {restaurant.name}</h1>
                    <img src={restaurant.logo} alt={restaurant.name} className="w-16 h-16 rounded-full" />
                </div>
                {JSON.stringify(restaurant)}
                {!restaurant.hours && (
                    <div className="tracking-wide leading-tight bg-destructive py-2 px-3 rounded">Pas d'horaires de service indiquer <a href="" className="underline">ici</a></div>
                )}
                {!restaurant.days && (
                    <div className="tracking-wide leading-tight bg-destructive py-2 px-3 rounded">Pas de jours d'ouverture indiquer <a href="" className="underline">ici</a></div>
                )}
                <div className="w-full h-80 border rounded bg-secondary/80 text-secondary-foreground stroke-current relative">
                    <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8 absolute top-4 right-4" />
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="h-60 w-1/2 bg-secondary/80 border rounded" />
                    <div className="h-60 w-1/2 bg-secondary/80 border rounded" />
                </div>
            
        </DashboardLayout>
    );
}
