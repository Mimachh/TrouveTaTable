import AlertBanner from "@/Components/AlertBanner";
import MessageStatus from "@/Components/restaurant-message-status/MessageStatus";
import Error from "@/Components/restaurant-message-status/Messages/Error";
import { isRestaurantMissInformation } from "@/lib/check-missing-information";
import { Restaurant } from "@/types/restaurant";
import { Link } from "@inertiajs/react";

const CanNotUseMessages = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="">
            <AlertBanner>
                <div className="space-y-2 text-secondary-foreground">
                    <p className="text-lg font-semibold">
                        Le système de contact est actuellement désactivé voici
                        les raisons possibles :
                    </p>

                    <div className="md:w-2/3">
                        {!restaurant.accept_messages && (
                            <MessageStatus restaurant={restaurant} />
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
        </div>
    );
};

export default CanNotUseMessages;
