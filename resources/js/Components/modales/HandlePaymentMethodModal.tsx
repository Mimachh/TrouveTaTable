import { useState } from "react";
import { Modal } from "../ui/modal";
import { useHandlePaymentMethodModal } from "@/hooks/useHandlePaymentMethodModal";
import { PaymentMethod } from "@/types/stripe";
import { Icon } from "../Icon";
import { Button } from "../ui/button";
import { AnimatePresence } from "framer-motion";
import ConfirmDelete from "../form/payment-method/confirm-delete";
import ShowAllPaymentMethod from "../form/payment-method/show-all-payment-method";

type Props = {
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: PaymentMethod;
};

const HandlePaymentMethodModal = (props: Props) => {
    const { paymentMethods, defaultPaymentMethod } = props;
    const isOpen = useHandlePaymentMethodModal.use.isOpen();
    const onClose = useHandlePaymentMethodModal.use.onClose();
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [showUpdateMethod, setShowUpdateMethod] = useState(true);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
   
    const openConfirmDeletion = (id: string) => {
        setIdToDelete(id);
        setShowDeleteConfirm(true);
        setShowUpdateMethod(false);
    };

    return (
        <Modal
            title={`Modifier vos moyens de paiement`}
            // description="En cas de besoin contactez-nous. Nous vous répondrons dans les plus brefs délais."
            isOpen={isOpen}
            onClose={onClose}
        >
            <AnimatePresence>
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
                    <ShowAllPaymentMethod
                        defaultPaymentMethod={defaultPaymentMethod}
                        openConfirmDeletion={openConfirmDeletion}
                        setShowSubmitButton={setShowSubmitButton}
                        paymentMethods={paymentMethods}
                        setShowUpdateMethod={setShowUpdateMethod}
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
            </AnimatePresence>
        </Modal>
    );
};

export default HandlePaymentMethodModal;
