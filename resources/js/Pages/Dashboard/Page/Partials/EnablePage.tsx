import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Switch } from "@/Components/ui/switch";
import useToastErrorNotFondator from "@/hooks/fondator/useToastErrorNotFondator";
import { useUser } from "@/hooks/useUser";
import { Restaurant } from "@/types/restaurant";
import { router } from "@inertiajs/react";
import axios from "axios";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    restaurant: Restaurant;
    can: {
        enablePage: boolean;
        updatePage: boolean;
        updateBanner: boolean;
        updateAvatar: boolean;
        updateMedia: boolean;
    };
}
const EnablePage = (props: Props) => {
    const { restaurant, can } = props;
    const { showErrorToast } = useToastErrorNotFondator();
    const user = useUser.use.user();
    const [loading, setLoading] = useState<boolean>(false);
    const [enablePage, setEnablePage] = useState<boolean>(
        restaurant.enable_page,
    );

    const [errors, setErrors] = useState({
        enable_page: "",
    });

    const submit = (e: boolean) => {
        if (!user?.isFondator) {
            showErrorToast({
                message:
                    "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                action: "Mettre à niveau",
            });
            return;
        }
        if (!can.enablePage) {
            toast.error("Vous n'avez pas la permission d'activer cette page");
            return;
        }
        setLoading(true);
        setErrors({
            enable_page: "",
        });

        axios
            .put(`/dashboard/${restaurant.id}/page/enablePage`, {
                enable_page: e,
            })
            .then((response) => {
                // console.log(response);
                toast.success("Page activée !");
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

    const copy = () => {
        navigator.clipboard.writeText(restaurant?.restaurant_link_page ?? "");
        toast.success("Lien copié !");
    };

    return (
        <Card x-chunk="settings-page" className="h-fit bg-accent md:col-span-1">
            <CardHeader className="px-7 py-3">
                <CardTitle className="text-md">Page web</CardTitle>
                <CardDescription>
                    Rendre public ou non votre page vitrine.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Activer le page web ?"
                    fieldName="enable_page"
                    className="flex w-full items-center gap-6 space-y-0 rounded-lg border border-muted bg-background p-4"
                    error={errors.enable_page}
                >
                    <Switch
                        checked={enablePage}
                        disabled={loading}
                        onCheckedChange={(e) => {
                            if (!user?.isFondator) {
                                showErrorToast({
                                    message:
                                        "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                                    action: "Mettre à niveau",
                                });
                                return;
                            }
                            if (!can.enablePage) {
                                toast.error(
                                    "Vous n'avez pas la permission d'activer cette page",
                                );
                                return;
                            }
                            setEnablePage(() => {
                                submit(e);
                                return e;
                            });
                        }}
                    />
                </FormFieldLayout>

                {restaurant.enable_page == true && can.enablePage ? (
                    <div className="mt-5 flex items-center justify-center gap-2 text-sm">
                        <Button
                            variant={"link"}
                            onClick={() => {
                                window.open(
                                    restaurant.restaurant_link_page,
                                    "_blank",
                                );
                            }}
                        >
                            <span className="flex items-center gap-2">
                                {" "}
                                Voir la page en ligne
                                <ArrowRight className="h-4 w-4 text-inherit" />
                            </span>
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={copy}
                        >
                            Copier le lien
                            <Copy className="h-4 w-4 text-inherit" />
                        </Button>
                    </div>
                ) : (
                    <p className="p-4">La page est actuellement désactivée.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default EnablePage;
