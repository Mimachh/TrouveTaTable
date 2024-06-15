import { useRef, useState } from "react";

import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormatUserSubscription, Subscription } from "@/types";
import { AlertModal } from "@/Components/modales/AlertModal";
import { toast } from "sonner";
import {
    formatPriceFromCents,
    transformMonthPriceToYearPrice,
} from "@/lib/format-price";

export default function CancelSubscription({
    className = "",
    subscriptions,
}: {
    className?: string;
    subscriptions?: FormatUserSubscription[];
}) {
    const [confirmingSubscriptionDeletion, setConfirmingSubscriptionDeletion] =
        useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState<string | null>(
        null,
    );

    const confirmSubscriptionDeletion = () => {
        setConfirmingSubscriptionDeletion(true);
    };

    const closeModal = () => {
        setConfirmingSubscriptionDeletion(false);
        setSubscriptionId(null);
        setSubscriptionName(null);
    };

    const onDelete = () => {
        router.delete("/subscribe/cancel", {
            data: {
                sub_name: subscriptionName,
                id: subscriptionId,
            },
            preserveScroll: true,
            onSuccess: () => {
                closeModal(), toast.success("Abonnement annulé avec succès");
            },
            onError: () => passwordInput.current?.focus(),
        });

        // router.visit("/dashboard");
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    Abonnement
                </h2>
            </header>
            <div className="space-y-2">
                {subscriptions?.map((subscription) => (
                    <div
                        key={subscription.id}
                        className="flex w-fit flex-col gap-5 rounded-lg border border-muted-foreground p-4"
                    >
                        <p className="text-[15px] font-semibold tracking-wide text-muted-foreground">
                            {subscription.name} :{" "}
                            <span className="font-normal">
                                {subscription.recurrence === "monthly" ? (
                                    <>
                                        {formatPriceFromCents(
                                            subscription.price,
                                            true,
                                        )}{" "}
                                        €/{"mois"}
                                    </>
                                ) : (
                                    <>
                                        {transformMonthPriceToYearPrice(
                                            parseInt(
                                                formatPriceFromCents(
                                                    subscription.price,
                                                    true,
                                                ),
                                            ),
                                        )}{" "}
                                        €/{"an"}
                                    </>
                                )}
                            </span>
                        </p>
                        {subscription.isOnGracePeriod ? (
                            <>
                                {subscription.ends_at && (
                                    <p className="text-sm">
                                        Votre abonnement prendra fin le :{" "}
                                        {new Date(
                                            subscription.ends_at,
                                        ).toLocaleDateString("fr-FR")}
                                    </p>
                                )}
                            </>
                        ) : (
                            <Button
                                variant={"destructive"}
                                size={"sm"}
                                onClick={() => {
                                    confirmSubscriptionDeletion();
                                    setSubscriptionId(subscription.id);
                                    setSubscriptionName(subscription.name);
                                }}
                            >
                                Annuler
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <AlertModal
                isOpen={confirmingSubscriptionDeletion}
                onClose={closeModal}
                onConfirm={onDelete}
                loading={loading}
                title="Êtes-vous sûr de vouloir supprimer votre abonnement ?"
                description="Cette action est irréversible. Vous perdrez accès aux fonctionnalités de votre abonnement."
            />
        </section>
    );
}
