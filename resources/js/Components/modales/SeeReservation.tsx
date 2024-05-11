import { FormEventHandler, useEffect, useState } from "react";

import { Modal } from "@/Components/ui/modal";

import { LoaderCircle } from "lucide-react";
import { useShowReservationModal } from "@/hooks/useShowReservationModal";
import { formatTime } from "@/lib/format-time";
import FormFieldLayout from "../layout/form-field-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";

export const SeeReservation = ({restaurant} : {restaurant: Restaurant}) => {

    const reservation = useShowReservationModal.use.reservation();
    const status = useShowReservationModal.use.status();
    const modalIsOpen = useShowReservationModal.use.isOpen();
    const modalOnClose = useShowReservationModal.use.onClose();
    const loading = useShowReservationModal.use.loading();

    const [openReason, setOpenReason] = useState(false);

    useEffect(() => {
        if (modalIsOpen && reservation) {
            setData("reservation_id", reservation.id)
        }
    }, [reservation])

    const { data, setData, post, processing, errors, reset } = useForm({
        reservation_id: reservation?.id ?? null,
        status: reservation?.status ?? null,
        reason: "",
    });

    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("reservation.change.status", { reservation: reservation?.id, restaurant: restaurant.id}), {
            preserveScroll: true,
            onError: (e) => {
                toast.error("Une erreur s'est produite, veuillez réessayer.")
            },
            onSuccess: (e) => {
                modalOnClose();
                setOpenReason(false);
                toast.success("Le status de la réservation a été modifié avec succès.")
            }
            
        });
    };
    return (
        <Modal
            title="Réservation"
            description="Détails de la réservation"
            isOpen={modalIsOpen}
            onClose={() => {
                modalOnClose();
                setOpenReason(false);
            }}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <div className="w-full">
                            {loading ? (
                                <div className="w-full flex items-center justify-center">
                                    <LoaderCircle className="w-6 h-6 animate animate-spin" />
                                </div>
                            ) : (
                                <div className="text-sm leading-6">
                                    <p>
                                        Nom : {reservation?.last_name} <br />{" "}
                                        Prénom : {reservation?.first_name}
                                    </p>
                                    <p>Email : {reservation?.email}</p>
                                    <p>
                                        Téléphone :{" "}
                                        {reservation?.phone ?? "Non renseigné"}
                                    </p>
                                    <p>
                                        Date de réservation :{" "}
                                        {reservation?.reservation_date} -{" "}
                                        {reservation?.time
                                            ? formatTime(reservation?.time)
                                            : null}
                                    </p>

                                    <p>
                                        Nombre de couverts :{" "}
                                        {reservation?.guests}
                                    </p>
                                    <p>Table : {reservation?.table.name}</p>
                                    <Separator className="my-2" />
                                    <div className="space-y-3">
                                        <FormFieldLayout
                                            label="Status de la réservation"
                                            fieldName="status"
                                            error={errors.status ?? ""}
                                            className="w-full"
                                        >
                                            <Select
                                                onValueChange={(e) => {
                                                    setOpenReason(true);
                                                    setData("status", e);
                                                }}
                                                defaultValue={
                                                    reservation?.status
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="status" />
                                                </SelectTrigger>
                                                <SelectContent id="status">
                                                    {status.map((item) => (
                                                        <SelectItem
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormFieldLayout>
                                        {openReason && (
                                            <>
                                                <form onSubmit={submit}>
                                                    <FormFieldLayout
                                                        label="Note au client"
                                                        description="Informez le client de la raison du changement de status."
                                                        fieldName="status"
                                                        error={
                                                            errors.reason ?? ""
                                                        }
                                                        className="w-full"
                                                    >
                                                        <Textarea
                                                            placeholder="Bonjour, nous vous informons que votre réservation a été annulée pour la raison suivante :"
                                                            className="resize-none"
                                                            onChange={(e) => {
                                                                setData(
                                                                    "reason",
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </FormFieldLayout>

                                                    <Button
                                                        disabled={processing}
                                                        className="w-full"
                                                    >
                                                        Modifier
                                                    </Button>
                                                </form>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
