import FormFieldLayout from "@/Components/layout/form-field-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Switch } from "@/Components/ui/switch";
import { Restaurant } from "@/types/restaurant";
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

    const [loading, setLoading] = useState<boolean>(false);
    const [acceptMessages, setAcceptMessages] = useState<boolean>(
        restaurant.accept_messages
    );

    const [errors, setErrors] = useState({
        accept_messages: "",
    });

    const submit = (e: boolean) => {
        if(!can.enableMessages) {
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
            </CardContent>
        </Card>
    );
};

export default EnableDisableContactMessage;
