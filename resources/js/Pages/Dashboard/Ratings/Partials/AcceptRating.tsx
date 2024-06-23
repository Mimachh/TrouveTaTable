import { useState } from "react";
import axios from "axios";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Switch } from "@/Components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { router } from "@inertiajs/react";
import MissingInfoRestaurant from "@/Components/MissingInfoRestaurant";
import RestaurantStatus from "@/Components/restaurant-message-status/RestaurantStatus";
import ReservationStatus from "@/Components/restaurant-message-status/ReservationStatus";
import ServicesStatus from "@/Components/restaurant-message-status/ServicesStatus";
import CanNotUseBooking from "../../Settings/Notifications/Partials/CanNotUseBooking";

interface Props {
    restaurant: Restaurant;
    can: {
        enable_rating: boolean;
    };
    isMissingInfo: boolean;
}

const AcceptRating = (props: Props) => {
    const {
        restaurant,
        isMissingInfo,
        can = {
            enable_rating: false,
        },
    } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [acceptRating, setAcceptRating] = useState<boolean>(
        restaurant.accept_rating,
    );

    const [errors, setErrors] = useState({
        accept_rating: "",
    });

    const submit = (e: boolean) => {
        if (!can.enable_rating) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action",
            );
            return;
        }
        setLoading(true);
        setErrors({
            accept_rating: "",
        });

        axios
            .put(`/dashboard/${restaurant.id}/ratings/status`, {
                accept_rating: e,
            })
            .then((response) => {
                // console.log(response);
                toast.success("Statut modifié !");
                router.reload();
            })
            .catch((error) => {
                toast.error(
                    "Une erreur est survenue, veuillez réessayer plus tard",
                );
                setErrors(error.response.data.errors);
                // console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Card
            x-chunk="dashboard-05-chunk-3"
            className="h-fit bg-accent md:col-span-1"
        >
            <CardHeader className="px-7">
                <CardTitle>Statut du formulaire d'évaluation</CardTitle>
                <CardDescription>
                    Activer ou désactiver l'envoi d'un formulaire d'évaluation à
                    vos clients, suite à leur passage dans votre établissement.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                {isMissingInfo && (
                    <MissingInfoRestaurant restaurant={restaurant} />
                )}

                {!isMissingInfo && !restaurant.can.accept_booking ? (
                    <div className="w-full">
                        <CanNotUseBooking restaurant={restaurant} 
                        sectionClassNames="md:w-full"
                        message="Vous ne pouvez pas activer ce service voici les raisons possibles : " />
                    </div>
                ) : (
                    <FormFieldLayout
                        label="Activer les évaluations ?"
                        fieldName="name"
                        className="flex w-full items-center gap-6 space-y-0 rounded-lg border border-muted bg-background p-4"
                        error={errors?.accept_rating ?? ""}
                    >
                        <Switch
                            checked={acceptRating}
                            disabled={loading || !can.enable_rating}
                            onCheckedChange={(e) => {
                                setAcceptRating(() => {
                                    submit(e);
                                    return e;
                                });
                            }}
                        />
                    </FormFieldLayout>
                )}
            </CardContent>
        </Card>
    );
};

export default AcceptRating;
