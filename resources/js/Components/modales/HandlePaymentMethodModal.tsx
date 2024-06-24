import { useState } from "react";
import { Modal } from "../ui/modal";
import { useHandlePaymentMethodModal } from "@/hooks/useHandlePaymentMethodModal";
import { PaymentMethod } from "@/types/stripe";
import { Icon } from "../Icon";
import { Button } from "../ui/button";
import ConfirmDelete from "../form/payment-method/confirm-delete";
import UpdatePaymentMethod from "../form/payment-method/update-payment-method";
import AddNewPaymentMethod from "../form/payment-method/add-new-payment-method";
import StripeLoader from "@/utils/stripe-loader";

type Props = {
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: PaymentMethod;
    intent: any;
    stripeKey: string;
};

const HandlePaymentMethodModal = (props: Props) => {
    const { paymentMethods, defaultPaymentMethod, intent, stripeKey } = props;
    const isOpen = useHandlePaymentMethodModal.use.isOpen();
    const onClose = useHandlePaymentMethodModal.use.onClose();
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [showUpdateMethod, setShowUpdateMethod] = useState(true);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [showAddMethod, setShowAddMethod] = useState<boolean>(false);

    const openConfirmDeletion = (id: string) => {
        setIdToDelete(id);
        setShowDeleteConfirm(true);
        setShowUpdateMethod(false);
    };
    const onReset = () => {
        
        setShowUpdateMethod(true);
        setShowAddMethod(false);
        onClose();
    }
    return (
        <Modal
            title={`Modifier vos moyens de paiement`}
            // description="En cas de besoin contactez-nous. Nous vous répondrons dans les plus brefs délais."
            isOpen={isOpen}
            onClose={() => {
                onReset()
            }}
        >
            
            {!showUpdateMethod && (
                <div>
                    <Button
                        size={"xs"}
                        variant={"link"}
                        onClick={() => {
                            setShowUpdateMethod(true);
                        }}
                        className="flex items-center gap-2"
                    >
                        <Icon name="arrow-left" className="h-5 w-5" />
                        <span>Retour à mes cartes</span>
                    </Button>
                </div>
            )}

            {showUpdateMethod && (
                <UpdatePaymentMethod
                    defaultPaymentMethod={defaultPaymentMethod}
                    openConfirmDeletion={openConfirmDeletion}
                    setShowSubmitButton={setShowSubmitButton}
                    paymentMethods={paymentMethods}
                    showSubmitButton={showSubmitButton}
                    onClose={onClose}
                />
            )}

            {showDeleteConfirm && (
                <ConfirmDelete
                    idToDelete={idToDelete}
                    setShowDeleteConfirm={setShowDeleteConfirm}
                    setShowUpdateMethod={setShowUpdateMethod}
                    setIdToDelete={setIdToDelete}
                />
            )}

            {showAddMethod && (
                <>
                    <AddNewPaymentMethod
                        intent={intent}
                        stripeKey={stripeKey}
                        onReset={onReset}
                    />
                </>
            )}
            {showUpdateMethod && (
                <div className="mt-3">
                    <Button
                        onClick={() => {
                            setShowUpdateMethod(false);
                            setShowAddMethod(true);
                        }}
                        variant={"ghost"}
                        className="flex items-center gap-3"
                    >
                        <Icon name="plus" className="h-6 w-6" />
                        <span>Ajouter une nouvelle méthode de paiement</span>
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default HandlePaymentMethodModal;
