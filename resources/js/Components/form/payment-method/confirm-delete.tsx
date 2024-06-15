import { Icon } from "@/Components/Icon";
import { Button } from "@/Components/ui/button";
import SubmitButton from "@/Components/ui/submit-button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface Props {
    idToDelete: string | null;
    setIdToDelete: (id: string | null) => void;
    setShowDeleteConfirm: (value: boolean) => void;
    setShowUpdateMethod: (value: boolean) => void;
}
const ConfirmDelete = (props: Props) => {
    const { idToDelete, setIdToDelete, setShowDeleteConfirm, setShowUpdateMethod } = props;

    const { data, delete: deletePaymentMethod, processing } = useForm({
        id: idToDelete,
    })
    const resetDelete = () => {
        setIdToDelete(null);
        setShowDeleteConfirm(false);
        setShowUpdateMethod(true);
    };

    
    const  confirmDelete = () => {
        if(!data.id) {
            return toast.error("Une erreur s'est produite lors de la suppression de votre méthode de paiement. Veuillez réessayer plus tard ou nous contacter.")
        }
        deletePaymentMethod(route('billings.payment-method.delete', {id: data.id}), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Votre méthode de paiement a été supprimée avec succès.");
                setIdToDelete(null);
                setShowDeleteConfirm(false);
                setShowUpdateMethod(true);
            },
            onError: () => {
                setIdToDelete(null);
                setShowDeleteConfirm(false);
                setShowUpdateMethod(true);
                toast.error("Une erreur s'est produite lors de la suppression de votre méthode de paiement. Veuillez réessayer plus tard ou nous contacter.")
            }
        })
    }

    return (
        <div className="h-[45vh] w-full overflow-y-auto">
            <p className="mt-8 text-sm font-normal tracking-tight">
                Souhaitez-vous supprimé votre méthode de paiement ? Ceci est
                irréversible.
            </p>
            <div className="mt-12 flex w-full items-center justify-center gap-6">
                <Button
                    type="button"
                    className="h-16 w-16 rounded-full p-3 px-0 py-0"
                    onClick={resetDelete}
                    disabled={processing}
                >
                    <Icon name="x" className="h-9 w-9" />
                </Button>
                {idToDelete && (
                    <SubmitButton
                    variant={"destructive"}
                    type="button"
                    className="h-16 w-16 rounded-full p-3 px-0 py-0"
                    onClick={confirmDelete}
                    disabled={processing}
                >
                    <Icon name="check" className="h-9 w-9" />
                </SubmitButton>
                )}
                
            </div>
        </div>
    );
};

export default ConfirmDelete;
