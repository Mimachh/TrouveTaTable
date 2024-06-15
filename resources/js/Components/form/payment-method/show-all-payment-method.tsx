import { Icon, IconName } from "@/Components/Icon";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import SubmitButton from "@/Components/ui/submit-button";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/types/stripe";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

interface Props {
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: PaymentMethod;
    showSubmitButton: boolean;
    setShowSubmitButton: (value: boolean) => void;
    openConfirmDeletion: (id: string) => void;
    setShowUpdateMethod: (value: boolean) => void;
    onClose: () => void;
}
const ShowAllPaymentMethod = (props: Props) => {
    const {
        paymentMethods,
        defaultPaymentMethod,
        openConfirmDeletion,
        setShowSubmitButton,
        showSubmitButton,
        setShowUpdateMethod,
        onClose
    } = props;

    const { data, processing, errors, put, reset } = useForm({
        id: defaultPaymentMethod.id,
    });
    const submit: FormEventHandler = () => {
        put(route("billings.payment-method.update", {id: data.id}), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSubmitButton(false);
                onClose()
                toast.success("Votre méthode de paiement a été mise à jour.")
            },
            onError: (e) => {
            
                reset()
                toast.error("Une erreur est survenue. Veuillez réessayer.")
            }
        })
    }
    return (
        <>
            <div>
                    {paymentMethods && paymentMethods.length > 0 && (
                        <div className="max-h-[45vh] w-full overflow-y-auto border p-3">
                            <p className="text-md mb-4 font-semibold text-foreground/70">
                                Vos cartes enregistrées :{" "}
                            </p>
                            <RadioGroup
                                onValueChange={(e) => {
                                    setShowSubmitButton(true);
                                    data.id = e;
                                }}
                                defaultValue={data.id}
                            >
                                {paymentMethods.map((paymentMethod) => {
                                    {
                                        return (
                                            <div className="grid grid-cols-8 items-center gap-2">
                                                <div
                                                    key={paymentMethod.id}
                                                    className={cn(
                                                        "col-span-7 flex h-16 w-full cursor-pointer items-center space-x-2 rounded-lg border p-1",
                                                        paymentMethod.id ===
                                                            defaultPaymentMethod.id &&
                                                            "bg-primary/10",
                                                    )}
                                                >
                                                    <RadioGroupItem
                                                        value={paymentMethod.id}
                                                        id={paymentMethod.id}
                                                        className="cursor-pointer"
                                                    />
                                                    <Label
                                                        htmlFor={
                                                            paymentMethod.id
                                                        }
                                                        className="flex h-full w-full cursor-pointer items-center"
                                                    >
                                                        <Icon
                                                            name={
                                                                paymentMethod
                                                                    .card
                                                                    .brand as IconName
                                                            }
                                                            className="mr-3 h-12 w-12 text-current"
                                                        />
                                                        **** **** ****{" "}
                                                        {
                                                            defaultPaymentMethod
                                                                .card.last4
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            paymentMethod.card
                                                                .exp_month
                                                        }
                                                        /
                                                        {
                                                            paymentMethod.card
                                                                .exp_year
                                                        }
                                                    </Label>
                                                </div>
                                                {paymentMethod.id !==
                                                    defaultPaymentMethod.id && (
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"xs"}
                                                        onClick={() => {
                                                            openConfirmDeletion(
                                                                paymentMethod.id,
                                                            );
                                                        }}
                                                    >
                                                        <Icon
                                                            name="trash"
                                                            className="h-5 w-5 text-destructive"
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    }
                                })}
                            </RadioGroup>
                        </div>
                    )}
                    {showSubmitButton && (
                        <div className="mt-6 flex w-full items-center gap-2">
                            <Button
                                variant={"outline"}
                                type="button"
                                className="w-full"
                                disabled={processing}
                                onClick={() => {
                                    setShowSubmitButton(false);
                                }}
                            >
                                Annuler
                            </Button>
                            <SubmitButton
                                disabled={processing}
                                onClick={submit}
                                className="w-full"
                            >
                                Mettre à jour
                            </SubmitButton>
                        </div>
                    )}
            </div>

            <div className="mt-3">
                <Button
                    onClick={() => {
                        setShowUpdateMethod(false);
                    }}
                    variant={"ghost"}
                    className="flex items-center gap-3"
                >
                    <Icon name="plus" className="h-6 w-6" />
                    <span>Ajouter une nouvelle méthode de paiement</span>
                </Button>
            </div>
        </>
    );
};

export default ShowAllPaymentMethod;
