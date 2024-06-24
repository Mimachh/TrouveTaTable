import AlertBanner from "@/Components/AlertBanner";
import Error from "@/Components/restaurant-message-status/Messages/Error";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import SupportButton from "@/Components/ui/support-button";
import { isRestaurantMissInformation } from "@/lib/check-missing-information";
import { cn } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant";
import { Link } from "@inertiajs/react";

interface Props {
    restaurant: Restaurant;
    message?: string;
    sectionClassNames?: string;
}
const CanNotUseBooking = (props: Props) => {
    const {
        restaurant,
        message = " Le système de réservation est actuellement désactivé voici les raisons possibles :",
        sectionClassNames
    } = props;
    return (
        <div className="">
            <AlertBanner>
                <div className="space-y-2 text-secondary-foreground">
                    <p className="text-lg font-semibold">{message}</p>

                    <div className={cn("md:w-2/3", sectionClassNames)}>
                        {!restaurant.accept_reservations && (
                            <ReservationStatus restaurant={restaurant} />
                        )}
                    </div>
                    <div className={cn("md:w-2/3", sectionClassNames)}>
                        {!restaurant.active && (
                            <RestaurantStatus restaurant={restaurant} />
                        )}
                    </div>
                    {isRestaurantMissInformation(restaurant) && (
                        <div className="flex w-full items-center gap-1 pl-0.5">
                            <Error
                                message="Des informations nécessaires au
                                            fonctionnement des services sont
                                            manquantes. Veuillez les"
                            />
                            <Link
                                className="text-primaryBlue underline"
                                href={route(
                                    "dashboard.settings.index",
                                    restaurant.id,
                                )}
                            >
                                compléter
                            </Link>
                        </div>
                    )}
                </div>
            </AlertBanner>
            <div className="text-sm text-muted-foreground">
                <p>
                    Si vous ne comprenez pas pourquoi vous avez ce message vous
                    pouvez contacter le support client :{" "}
                </p>
            </div>
            <div className="mt-5 max-w-[280px]">
                <SupportButton variant="primaryBlue" />
            </div>
        </div>
    );
};

export default CanNotUseBooking;
