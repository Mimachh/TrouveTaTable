import { Restaurant } from "@/types/restaurant";
import Success from "./Messages/Success";
import Error from "./Messages/Error";
import { Link } from "@inertiajs/react";

const MessageStatus = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex justify-between items-center px-0.5">
            {restaurant.accept_messages ? (
                <Success message="Le module de contact en ligne est activé" />
            ) : (
                <Error message="Le module de contact en ligne est désactivé" />
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

export default MessageStatus