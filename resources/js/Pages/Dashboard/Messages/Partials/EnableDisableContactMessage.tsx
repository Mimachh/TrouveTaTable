import ErrorMustBeFondator from "@/Components/fondator/message-error-must-be-fondator";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Switch } from "@/Components/ui/switch";
import useToastErrorNotFondator from "@/hooks/fondator/useToastErrorNotFondator";
import { User } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    restaurant: Restaurant;
    can: {
        enableMessages: boolean
    }
}
const EnableDisableContactMessage = (props: Props) => {

    const { restaurant, can} = props;
    const pageProps = usePage().props;
    const auth = pageProps.auth as unknown as any;
    const user = auth.user as User;
    const [loading, setLoading] = useState<boolean>(false);
    const [acceptMessages, setAcceptMessages] = useState<boolean>(
        restaurant.accept_messages
    );

    const [errors, setErrors] = useState({
        accept_messages: "",
    });

    const submit = (e: boolean) => {
        if(!can.enableMessages || !user?.isFondator) {
            toast.error("Vous n'avez pas la permission de modifier ce paramètre");
            return;
        }
        setLoading(true);
        setErrors({
            accept_messages: "",
        });

        axios
            .put(`/dashboard/${restaurant.id}/messages/status`, {
                accept_messages: e,
            })
            .then((response) => {
                // console.log(response);
                toast.success("Statut modifié !");
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
    const { showErrorToast } = useToastErrorNotFondator();
    return (
        <Card
            x-chunk="settings-messages"
            className="md:col-span-1 bg-accent h-fit"
        >
            <CardHeader className="px-7 py-3">
                <CardTitle className="text-md">Formulaire de contact</CardTitle>
                <CardDescription>
                    Activer ou désactiver le formulaire de contact en ligne
                    de votre restaurant.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Activer le formulaire de contact ?"
                    fieldName="accept_messages"
                    className="flex gap-6 w-full items-center border border-muted rounded-lg p-4
            bg-background space-y-0
            "
                    error={errors?.accept_messages ?? ""}
                >
                    <Switch
                        disabled={loading || !can.enableMessages}
                        checked={acceptMessages}
                        onCheckedChange={(e) => {
                            if(!user?.isFondator) {
                                showErrorToast({
                                    message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                                    action: "Mettre à niveau",
                                });
                                return;
                            }
                            if(!can.enableMessages) {
                                toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                                return;
                            }
                            setAcceptMessages(() => {
                                submit(e);
                                return e;
                            });
                        }}
                    />
                </FormFieldLayout>
                {!user?.isFondator && (
                    <ErrorMustBeFondator message="Il faut être abonné pour pouvoir activer le système de contact." />
                )}
            </CardContent>
        </Card>
    );
};

export default EnableDisableContactMessage;
