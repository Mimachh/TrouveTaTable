import AlertBanner from "@/Components/AlertBanner";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import SubmitButton from "@/Components/ui/submit-button";
import { Switch } from "@/Components/ui/switch";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps, User } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import useToastErrorNotFondator from "@/hooks/fondator/useToastErrorNotFondator";
import React, { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import ErrorMustBeFondator from "@/Components/fondator/message-error-must-be-fondator";
type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    can: {
        update_settings: boolean;
        change_status: boolean;
    };
    isMissingInfo: boolean;
};

const Settings = (props: Props) => {
    const { restaurant, can, isMissingInfo, auth } = props;
    const user = auth.user;
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(restaurant.data.active);
    const [loading, setLoading] = useState<boolean>(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: restaurant.data.name ?? "",
        phone: restaurant.data.phone ?? "",
        email: restaurant.data.email ?? "",
        address: restaurant.data.address ?? "",
        city: restaurant.data.city ?? "",
        zip: restaurant.data.zip ?? "",
    });
    const { showErrorToast } = useToastErrorNotFondator();
    const submit: FormEventHandler = (e) => {
        if (!can.update_settings) {
            toast.error(
                "Vous n'avez pas les droits pour effectuer cette action.",
            );
            return;
        }
        e.preventDefault();
        put(
            route("dashboard.settings.update", {
                restaurant: restaurant.data.id,
            }),
            {
                onSuccess: () => {
                    toast.success("Les informations ont été mises à jour.");
                    setShowButtons(false);
                    router.reload();
                },
                onError: (error) => {
                    // console.log(error);
                },
            },
        );
    };

    const restaurantStatusSubmit = (e: boolean) => {
        if (user?.isFondator == false) {
            showErrorToast({
                message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                action: "Mettre à niveau",
            });
            return;
        }
        setLoading(true);

        axios
            .put(
                route("dashboard.settings.change-status", {
                    restaurant: restaurant.data.id,
                }),
                {
                    active: e,
                },
            )
            .then((response) => {
                // console.log(response);
                toast.success("Statut modifié !");
                router.reload();
            })
            .catch((error) => {
                toast.error(
                    "Une erreur est survenue, veuillez réessayer plus tard",
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div>
            <FormFieldLayout
                label="Status du restaurant"
                fieldName="name"
                className="flex w-fit items-center gap-6 space-y-0 rounded-lg border border-muted bg-background p-4"
            >
                {isActive == true && "Actif"}
                <Switch
                    checked={isActive}
                    disabled={
                        loading ||
                        processing
                    }
                    onCheckedChange={(e) => {
                        if (!user?.isFondator) {
                            showErrorToast({
                                message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                                action: "Mettre à niveau",
                            });
                            return;
                        }
                        if (!can.change_status) {
                            toast.error(
                                "Vous n'avez pas les droits pour effectuer cette action.",
                            );
                            return;
                        }
                        setIsActive(() => {
                            restaurantStatusSubmit(e);
                            return e;
                        });
                    }}
                />
                {!isActive && "Inactif"}
                {!user?.isFondator && (
                    <ErrorMustBeFondator message="Il faut être abonné pour pouvoir activer le système de contact." />
                )}
            </FormFieldLayout>
            {isMissingInfo && (
                <AlertBanner>
                    <ul className="list-disc pl-6">
                        <li>
                            Des informations nécessaires au fonctionnement des
                            services sont manquantes.
                        </li>
                        <li>Veuillez remplir les champs marqués d'un *</li>
                    </ul>
                </AlertBanner>
            )}
            <form onSubmit={submit}>
                <div className="flex items-center justify-between">
                    <h1 className="p-2 text-4xl font-semibold tracking-wide">
                        Paramètre de votre restaurant: {restaurant.data.name}
                    </h1>

                    <div>
                        {can.update_settings && showButtons && (
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={processing || loading}
                                    onClick={() => {
                                        reset();
                                        setShowButtons(false);
                                    }}
                                >
                                    Annuler
                                </Button>

                                <SubmitButton
                                    disabled={processing || loading}
                                    type="submit"
                                >
                                    Enregistrer
                                </SubmitButton>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <Card
                        x-chunk="dashboard-settings-adresse"
                        className="bg-accent md:col-span-1"
                    >
                        <CardHeader className="px-7">
                            <CardTitle>Informations principales</CardTitle>
                            <CardDescription>
                                Ces informations sont obligatoires pour le bon
                                fonction de nos services.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <FormFieldLayout
                                    label="Nom du restaurant *"
                                    fieldName="name"
                                    error={errors.name ?? ""}
                                >
                                    <Input
                                        id="name"
                                        type="name"
                                        name="name"
                                        value={data.name}
                                        placeholder="Nom du restaurant"
                                        className="mt-1 block w-full border py-3"
                                        autoComplete="username"
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>

                                <FormFieldLayout
                                    label="Email du restaurant *"
                                    fieldName="email"
                                    error={errors.email ?? ""}
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Adresse mail du restaurant"
                                        value={data.email}
                                        className="mt-1 block w-full border py-3"
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>

                                <FormFieldLayout
                                    label="Téléphone *"
                                    fieldName="phone"
                                    error={errors.phone ?? ""}
                                >
                                    <Input
                                        id="phone"
                                        type="phone"
                                        name="phone"
                                        placeholder="Téléphone du restaurant"
                                        value={data.phone}
                                        className="mt-1 block w-full border py-3"
                                        onChange={(e) => {
                                            setData("phone", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        x-chunk="dashboard-settings-adresse"
                        className="bg-accent md:col-span-2"
                    >
                        <CardHeader className="px-7">
                            <CardTitle>Localisation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="md:grid md:grid-cols-3 md:gap-3">
                                <FormFieldLayout
                                    label="Adresse *"
                                    fieldName="address"
                                    error={errors.address ?? ""}
                                >
                                    <Input
                                        id="address"
                                        type="address"
                                        name="address"
                                        placeholder="3 rue du Port"
                                        value={data.address}
                                        className="mt-1 block w-full border py-3"
                                        autoComplete="address"
                                        onChange={(e) => {
                                            setData("address", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>

                                <FormFieldLayout
                                    label="Code postal *"
                                    fieldName="zip"
                                    error={errors.zip ?? ""}
                                >
                                    <Input
                                        id="zip"
                                        type="zip"
                                        name="zip"
                                        placeholder="72000"
                                        value={data.zip}
                                        className="mt-1 block w-full border py-3"
                                        autoComplete="zip"
                                        onChange={(e) => {
                                            setData("zip", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>

                                <FormFieldLayout
                                    label="Ville *"
                                    fieldName="city"
                                    error={errors.city ?? ""}
                                >
                                    <Input
                                        id="city"
                                        type="city"
                                        name="city"
                                        placeholder="Le Mans"
                                        value={data.city}
                                        className="mt-1 block w-full border py-3"
                                        autoComplete="city"
                                        onChange={(e) => {
                                            setData("city", e.target.value);
                                            setShowButtons(true);
                                        }}
                                    />
                                </FormFieldLayout>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
};

Settings.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
