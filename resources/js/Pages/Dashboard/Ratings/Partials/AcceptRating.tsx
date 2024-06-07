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

interface Props {
    restaurant: Restaurant;
    can: {
        enable_rating: boolean;
    };
}

const AcceptRating = (props: Props) => {
    const {
        restaurant,
        can = {
            enable_rating: false,
        },
    } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [acceptRating, setAcceptRating] = useState<boolean>(
        restaurant.accept_rating
    );

    const [errors, setErrors] = useState({
        accept_rating: "",
    });

    const submit = (e: boolean) => {
        if(!can.enable_rating) {
            toast.error("Vous n'avez pas les droits pour effectuer cette action");
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
                    "Une erreur est survenue, veuillez réessayer plus tard"
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
            className="md:col-span-1 bg-accent h-fit"
        >
            <CardHeader className="px-7">
                <CardTitle>Statut du formulaire d'évaluation</CardTitle>
                <CardDescription>
                    Activer ou désactiver l'envoi d'un formulaire d'évaluation à
                    vos clients, suite à leur passage dans votre établissement.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Activer les évaluations ?"
                    fieldName="name"
                    className="flex gap-6 w-full items-center border border-muted rounded-lg p-4
                    bg-background space-y-0
                    "
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
            </CardContent>
        </Card>
    );
};

export default AcceptRating;
