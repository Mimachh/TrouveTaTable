import AlertBanner from "./AlertBanner";
import { Link } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";

const MissingInfoRestaurant = ({restaurant}: {restaurant: Restaurant}) => {
    return (
        <AlertBanner>
            <ul className="list-disc pl-6">
                <li>
                    Des informations nécessaires au fonctionnement des services
                    sont manquantes. Veuillez les{" "}
                    <Link
                        className="underline text-primaryBlue"
                        href={route("dashboard.settings.index", restaurant.id)}
                    >
                        compléter
                    </Link>
                    .
                </li>
            </ul>
        </AlertBanner>
    );
};

export default MissingInfoRestaurant;
