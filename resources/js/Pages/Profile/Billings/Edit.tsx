import { Head } from "@inertiajs/react";
import { FormatUserSubscription, PageProps, User } from "@/types";

import { Invoice } from "@/types/Invoices";
import ProfileLayout from "@/Layouts/ProfileLayout";
import CancelSubscription from "../Partials/CancelSubscription";
import Invoices from "../Partials/Invoices";
import { PaymentMethod } from "@/types/stripe";
import { Icon, IconName } from "@/Components/Icon";
import { Button } from "@/Components/ui/button";
import { useHandlePaymentMethodModal } from "@/hooks/useHandlePaymentMethodModal";
import HandlePaymentMethodModal from "@/Components/modales/HandlePaymentMethodModal";
import StripeLoader from "@/utils/stripe-loader";

type EditProps = PageProps & {
    subscriptions: FormatUserSubscription[];
    invoices?: Invoice[];
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: PaymentMethod;
    intent: any;
    stripeKey: string;
};

function Edit({
    auth,
    subscriptions,
    invoices,
    paymentMethods,
    defaultPaymentMethod,
    intent,
    stripeKey,
}: EditProps) {
    const onOpen = useHandlePaymentMethodModal.use.onOpen();
    return (
        <>
            <Head title="Abonnements" />
            <StripeLoader />
            <HandlePaymentMethodModal
                intent={intent}
                stripeKey={stripeKey}
                paymentMethods={paymentMethods}
                defaultPaymentMethod={defaultPaymentMethod}
            />
            <div className="py-12">
                <div className="mx-auto space-y-6">
                    <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-foreground">
                                Informations de paiement
                            </h2>
                            {paymentMethods.length > 0 && (
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    onClick={onOpen}
                                >
                                    <Icon
                                        name="pencil"
                                        className="h-5 w-5 text-foreground"
                                    />
                                </Button>
                            )}
                        </div>
                        <div>
                            {defaultPaymentMethod && (
                                <div className="mt-10 w-fit rounded-lg bg-white p-6 shadow-md">
                                    <p className="mb-4 text-lg font-semibold text-gray-700">
                                        Votre méthode de paiement par défaut :{" "}
                                    </p>
                                    <div className="mb-2 flex items-center">
                                        <Icon
                                            name={
                                                defaultPaymentMethod.card
                                                    .brand as IconName
                                            }
                                            className="mr-3 h-12 w-12 text-current"
                                        />
                                        <p className="text-gray-700">
                                            **** **** ****{" "}
                                            {defaultPaymentMethod.card.last4}
                                        </p>
                                    </div>
                                    <p className="text-gray-500">
                                        Validité :{" "}
                                        {defaultPaymentMethod.card.exp_month}/
                                        {defaultPaymentMethod.card.exp_year}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                        {auth.user?.isSub ? (
                            <CancelSubscription
                                className=""
                                subscriptions={subscriptions}
                            />
                        ) : (
                            <div>
                                <p>Vous n'avez pas d'abonnement actif</p>
                            </div>
                        )}
                    </div>

                    {invoices && invoices.length > 0 && (
                        <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                            <Invoices invoices={invoices} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
Edit.layout = (page: React.ReactNode) => {
    return (
        <ProfileLayout
            header={
                <h1 className="p-2 text-4xl font-semibold tracking-wide">
                    Abonnements
                </h1>
            }
        >
            {page}
        </ProfileLayout>
    );
};

export default Edit;
