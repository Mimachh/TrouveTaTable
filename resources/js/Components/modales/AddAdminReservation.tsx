import { FormEventHandler, useEffect, useState } from "react";

import { Modal } from "@/Components/ui/modal";

import FormFieldLayout from "../layout/form-field-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { useAddAdminReservationModal } from "@/hooks/useAddAdminReservationModal";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import SubmitButton from "../ui/submit-button";
import { Input } from "../ui/input";
import axios from "axios";
import { TimeField } from "../TimePicker/time-field";
import { DatePickerState, useDatePickerState } from "react-stately";
import { Table } from "@/types/tables";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatDateToIsoMidDay } from "@/lib/format-date-to-iso-mid-day";
import { useReservationAndResetAfterAdding } from "@/hooks/useReservationAndResetAfterAdding";

export const AddAdminReservation = ({}: {}) => {
    const [error, setError] = useState<Record<string, string>>({});
    const [tables, setTables] = useState<Table[]>([]);

    const restaurantId = useAddAdminReservationModal.use.restaurantId();
    const reservationModalOnClose = useAddAdminReservationModal.use.onClose();
    const reservationModalIsOpen = useAddAdminReservationModal.use.isOpen();
    const selectedTime = useAddAdminReservationModal.use.time();

    const serviceId = useAddAdminReservationModal.use.serviceId();

    const setResetTheReservation = useReservationAndResetAfterAdding.use.setReset();

    const { data, setData, post, processing, errors, reset } = useForm({
        guests: undefined,
        time: "",
        table_id: undefined,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",

        service_id: undefined,
        services: [],
        reservation_date: "",
    });

    const date = useAddAdminReservationModal.use.date();

    const timeState = useDatePickerState({ granularity: "minute" });

    const {
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        steps,
        next,
        goTo,
    } = useMultistepForm([
        <Guest data={data} setData={setData} error={error} />,
        <TableAndTimeStep
            data={data}
            setData={setData}
            tables={tables}
            error={error}
            timeState={timeState}
        />,
        <UserStep data={data} setData={setData} error={error} />,
    ]);

    useEffect(() => {
        if (!reservationModalIsOpen) {
            setError({});
            setTables([]);
            goTo(0);
            reset();
        }
    }, [reservationModalIsOpen]);

    useEffect(() => {
        if (serviceId) {
            setData({
                ...data,
                "service_id": serviceId as any,
                "services": [serviceId] as any
              });
        }
    }, [serviceId]);

    const submit: FormEventHandler = (e?: any) => {
        if (e) e.preventDefault();
        setError({});

        if (currentStepIndex + 1 === 1) {
            setData("reservation_date", formatDateToIsoMidDay({ date: date }));

            axios
                .post(`/${restaurantId}/reservation/create/stepOne`, {
                    guests: data.guests,
                    reservation_date: formatDateToIsoMidDay({ date: date }),
                    service_id: serviceId,
                })
                .then((response) => {
                    setTables(response.data.data.tables);
                    return next();
                })
                .catch((e) => {
                    // console.error(e.response.data.errors);
                    setError(e.response.data.errors);
                    return;
                });
        }

        if (currentStepIndex + 1 === 2) {
            axios
                .post(`/${restaurantId}/reservation/create/stepTwo`, {
                    guests: data.guests,
                    time: data.time,
                    table_id: data.table_id,
                    reservation_date: formatDateToIsoMidDay({ date: date }),
                    services: [serviceId],
                })
                .then((response) => {
                    return next();
                })
                .catch((e) => {
                    // console.error(e.response.data.errors);
                    setError(e.response.data.errors);
                    return;
                });
        }

        if (currentStepIndex + 1 === 3) {
            post(`/${restaurantId}/reservation/create/stepThree`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Réservation effectuée avec succès");
                    setResetTheReservation(true);
                    reset()
                    //@ts-ignore
                    timeState.setTimeValue(undefined);
                    reservationModalOnClose();
                },
                onError: (errors) => {
                    setError(errors);
                },
              })

        }
    };

    // De quoi j'ai besoin ici ?
    // J'ai facilement accès au restaurant, j'ai accès aussi au jour. Peut être ajouter le bouton au service plutôt ? histoire d'avoir aussi le service

    return (
        <Modal
            title={`Réservation pour le ${format(
                date ?? new Date(),
                "EEEE dd MMMM yyyy",
                {
                    locale: fr,
                }
            )}`}
            description={`Détails de la réservation pour votre service : ${selectedTime}`}
            isOpen={reservationModalIsOpen}
            onClose={() => {
                reservationModalOnClose();
            }}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <div className="w-full">
                            <form onSubmit={submit}>
                                <div className="space-y-5">
                                    {step}

                                    <div className="grid grid-cols-5 gap-2">
                                        {!isFirstStep ? (
                                            <Button
                                                type="button"
                                                variant={"outline"}
                                                onClick={back}
                                                className="w-full col-span-2"
                                            >
                                                Retour
                                            </Button>
                                        ) : (
                                            <div className="col-span-2 w-full"></div>
                                        )}
                                        <small className="text-center self-center">
                                            {currentStepIndex + 1} /{" "}
                                            {steps.length}
                                        </small>
                                        <SubmitButton
                                            type="submit"
                                            disabled={processing}
                                            className="w-full col-span-2"
                                        >
                                            {isLastStep
                                                ? "Confirmer"
                                                : "Suivant"}
                                        </SubmitButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const Guest = ({
    data,
    setData,
    error,
}: {
    data: any;
    setData: any;
    error: Record<string, string>;
}) => {
    return (
        <div>
            <FormFieldLayout
                label="Nombre d'invité"
                fieldName="guests"
                error={error.guests}
            >
                <Input
                    id="guests"
                    type="number"
                    step={1}
                    min={1}
                    name="guests"
                    value={data.guests ?? ""}
                    className="mt-1 block w-full py-3 border"
                    onChange={(e) => setData("guests", e.target.value)}
                />
            </FormFieldLayout>
        </div>
    );
};

const TableAndTimeStep = ({
    data,
    setData,
    tables,
    error,
    timeState,
}: {
    data: any;
    setData: any;
    tables: Table[];
    error: Record<string, string>;
    timeState: DatePickerState;
}) => {
    return (
        <div className="space-y-3">
            <FormFieldLayout
                fieldName="time"
                error={error.time}
                label="Choisir l'heure de réservation"
            >
                <TimeField
                    label="Choisir l'heure de réservation"
                    value={timeState.timeValue ?? ""}
                    onChange={(value) => {
                        timeState.setTimeValue(value);

                        const { hour, minute } = value;
                        const time = `${hour
                            .toString()
                            .padStart(2, "0")}:${minute
                            .toString()
                            .padStart(2, "0")}:00`;
                        setData("time", time);
                    }}
                />
            </FormFieldLayout>

            <FormFieldLayout
                label="Choix de la table"
                fieldName="table_id"
                error={error.table_id}
            >
                <Select
                    onValueChange={(e) => {
                        setData("table_id", e);
                    }}
                    defaultValue={undefined}
                >
                    <SelectTrigger>
                        <SelectValue
                            defaultValue={data.table_id?.toString()}
                            placeholder="Choisir une table"
                        />
                    </SelectTrigger>
                    <SelectContent id="table">
                        {tables.map((table) => (
                            <SelectItem
                                key={table.id}
                                value={table.id?.toString() || "0"}
                            >
                                {table.name} - {table.seats} place(s)
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormFieldLayout>
        </div>
    );
};

const UserStep = ({
    data,
    setData,
    error,
}: {
    data: any;
    setData: any;
    error: Record<string, string>;
}) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormFieldLayout
                    fieldName="first_name"
                    label="Prénom"
                    // error={error.first_name}
                >
                    <Input
                        id="first-name"
                        value={data.first_name ?? ""}
                        onChange={(e) => setData("first_name", e.target.value)}
                        placeholder="Max"
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="last_name"
                    label="Nom"
                    // error={error.last_name}
                >
                    <Input
                        id="last-name"
                        value={data.last_name ?? ""}
                        onChange={(e) => setData("last_name", e.target.value)}
                        placeholder="Robinson"
                    />
                </FormFieldLayout>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormFieldLayout
                    fieldName="email"
                    label="Email"
                    // error={error.email}
                >
                    <Input
                        value={data.email ?? ""}
                        onChange={(e) => setData("email", e.target.value)}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                    />
                </FormFieldLayout>
                <FormFieldLayout
                    fieldName="phone"
                    label="Téléphone"
                    // error={error.phone}
                >
                    <Input
                        value={data.phone ?? ""}
                        onChange={(e) => setData("phone", e.target.value)}
                        id="phone"
                        type="text"
                        placeholder="06 12 34 56 78"
                    />
                </FormFieldLayout>
            </div>
        </div>
    );
};
