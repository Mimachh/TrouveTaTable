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
import { Button } from "@/Components/ui/button";
import { ArrowRight, Copy } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import useToastErrorNotFondator from "@/hooks/fondator/useToastErrorNotFondator";

interface Props {
    restaurant: Restaurant;
    can: {
        deleteRestaurantService: boolean;
        enableBookingForm: boolean;
    };
}

const AcceptReservation = (props: Props) => {
    const { restaurant, can } = props;

    const user = useUser.use.user();
    const { showErrorToast } = useToastErrorNotFondator();

    const [loading, setLoading] = useState<boolean>(false);
    const [acceptReservation, setAcceptReservation] = useState<boolean>(
        restaurant.accept_reservations
    );

    const [errors, setErrors] = useState({
        accept_reservations: "",
    });

    const submit = (e: boolean) => {
        if(!user?.isFondator) {
            showErrorToast({
                message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                action: "Mettre à niveau",
            });
            return;
        }
        if(!can.enableBookingForm) {
            toast.error("Vous n'avez pas la permission de modifier ce paramètre");
            return
        }
        setLoading(true);
        setErrors({
            accept_reservations: "",
        });

        axios
            .put(`/dashboard/${restaurant.id}/reservation/status`, {
                accept_reservations: e,
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

    const copy = () => {
        navigator.clipboard.writeText(restaurant?.restaurant_link_book_form ?? "");
        toast.success("Lien copié !");
    };
    return (
        <Card
            x-chunk="dashboard-05-chunk-3"
            className="md:col-span-1 bg-accent h-fit"
        >
            <CardHeader className="px-7">
                <CardTitle>Statut du formulaire de réservation</CardTitle>
                <CardDescription>
                    Activer ou désactiver le formulaire de réservation en ligne
                    de votre restaurant.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Activer les réservations en ligne ?"
                    fieldName="name"
                    className="flex gap-6 w-full items-center border border-muted rounded-lg p-4
                    bg-background space-y-0
                    "
                    error={errors?.accept_reservations ?? ""}
                >
                    <Switch
                        checked={acceptReservation}
                        disabled={loading}
                        onCheckedChange={(e) => {
                            if(!user?.isFondator) {
                                showErrorToast({
                                    message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                                    action: "Mettre à niveau",
                                });
                                return; 
                            }
                            if(!can.enableBookingForm) {
                                toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                                return
                            }
                            setAcceptReservation(() => {
                                submit(e);
                                return e;
                            });
                        }}
                    />
                </FormFieldLayout>

                {restaurant.accept_reservations == true && restaurant.restaurant_link_book_form && (
                    <div className="text-sm mt-5 flex items-center justify-center gap-2">
                        <Button
                            variant={"link"}
                            onClick={() => {
                                window.open(
                                    restaurant.restaurant_link_book_form,
                                    "_blank"
                                );
                            }}
                        >
                            <span className="flex gap-2 items-center">
                                {" "}
                                Voir le formulaire
                                <ArrowRight className="h-4 w-4 text-inherit" />
                            </span>
                        </Button>
                        <Button
                            className="flex gap-2 items-center"
                            variant="outline"
                            onClick={copy}
                        >
                            Copier le lien
                            <Copy className="h-4 w-4 text-inherit" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AcceptReservation;
