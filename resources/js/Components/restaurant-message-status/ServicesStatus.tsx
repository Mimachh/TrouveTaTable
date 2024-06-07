import { Restaurant } from "@/types/restaurant";
import Error from "./Messages/Error";
import Success from "./Messages/Success";
import { Link } from "@inertiajs/react";

const ServicesStatus = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.services.length === 0 ? (
                <Error message="Aucun horaire n'est indiqué" />
            ) : (
                <Success message="Des horaires d'ouverture sont indiqués" />
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

export default ServicesStatus