import AlertBanner from "@/Components/AlertBanner";
import Error from "@/Components/restaurant-message-status/Messages/Error";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import SupportButton from "@/Components/ui/support-button";
import { isRestaurantMissInformation } from "@/lib/check-missing-information";
import { Restaurant } from "@/types/restaurant";
import { Link } from "@inertiajs/react";

const CanNotUseBooking = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="">
            <AlertBanner>
                <div className="space-y-2 text-secondary-foreground">
                    <p className="text-lg font-semibold">
                        Le système de réservation est actuellement désactivé
                        voici les raisons possibles :
                    </p>

                    <div className="md:w-2/3">
                        {!restaurant.accept_reservations && (
                            <ReservationStatus restaurant={restaurant} />
                        )}
                    </div>
                    <div className="md:w-2/3">
                        {!restaurant.active && (
                            <RestaurantStatus restaurant={restaurant} />
                        )}
                    </div>
                    {isRestaurantMissInformation(restaurant) && (
                        <div className="pl-0.5 w-full flex items-center gap-1">
                            <Error
                                message="Des informations nécessaires au
                                            fonctionnement des services sont
                                            manquantes. Veuillez les"
                            />
                            <Link
                                className="underline text-primaryBlue"
                                href={route(
                                    "dashboard.settings.index",
                                    restaurant.id
                                )}
                            >
                                compléter
                            </Link>
                        </div>
                    )}

                    <div className="pl-0.5">
                        <Error message="Votre niveau d'abonnement ne le permet pas." />
                    </div>
                </div>
            </AlertBanner>
            <div className="text-muted-foreground text-sm">
                <p>
                    Si vous ne comprenez pas pourquoi vous avez ce message vous
                    pouvez contacter le support client :{" "}
                </p>
                <SupportButton />
            </div>
        </div>
    );
};

export default CanNotUseBooking;
