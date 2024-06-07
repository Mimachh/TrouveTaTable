import { Restaurant } from "@/types/restaurant";
import Success from "./Messages/Success";
import Error from "./Messages/Error";
import { Link } from "@inertiajs/react";

const RestaurantStatus = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.active ? (
                <Success message="Le restaurant est en ligne" />
            ) : (
                <Error message="Le restaurant est hors-ligne" />
            )}

            <Link
                className="text-sm text-primaryBlue underline"
                href={route("dashboard.settings.index", {
                    restaurant: restaurant.id,
                })}
            >
                Modifier
            </Link>
        </div>
    );
};

export default RestaurantStatus