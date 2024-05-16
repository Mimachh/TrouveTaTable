import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";


import ResaLayout from "@/Layouts/ResaLayout";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { Services } from "@/types/services";
import { useDatePickerState } from "react-stately";
import { Table } from "@/types/tables";
import DateInput from "./DateInput";
import TimeAndGuestSelector from "./TimeAndGuestSelector";
import TableInput from "./TableInput";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { PartySvg } from "@/Components/svg";
import { formatDateToIsoMidDay } from "@/lib/format-date-to-iso-mid-day";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";
import { useContactRestaurantModal } from "@/hooks/useContactRestaurantModal";

type ResaFormProps = PageProps & {
    before_today: Date;
    disabledDays: number[];
    id: number;
    restaurant: Restaurant;
};

const Index = ({
    before_today,
    disabledDays,
    id,
    restaurant,
}: ResaFormProps) => {
    const reservation_date = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [services, setServices] = useState<Services[]>([]);
    const [transformedServices, setTransformedServices] = useState<any[]>([]);
    const [tables, setTables] = useState<Table[]>([]);

    const { data, setData, reset, post, processing, errors, setError } =
        useForm({
            first_name: "",
            last_name: "",
            email: "",
            reservation_date: null,
            time: "",
            table_id: undefined,
            service_id: undefined,
            guests: 1,
            id: id,
        });

    const [goNext, setGoNext] = useState<boolean>(false);

    const timeState = useDatePickerState({ granularity: "minute" });

    const {
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        steps,
        next,
    } = useMultistepForm([
        <DateInput
            data={data}
            setData={setData}
            errors={errors}
            setGoNext={setGoNext}
            before_today={before_today}
            reservation_date={reservation_date}
            disabledDays={disabledDays}
        />,
        <TimeAndGuestSelector
            timeState={timeState}
            loading={loading}
            data={data}
            setData={setData}
            errors={errors}
            services={services}
            transformedServices={transformedServices}
        />,
        <TableInput
            data={data}
            setData={setData}
            errors={errors}
            tables={tables}
            setGoNext={setGoNext}
        />,
        <UserInputs data={data} setData={setData} errors={errors} />,
        <Success />,
    ]);

    function onSubmit(e?: any) {
        if (e) e.preventDefault();

        let isoDate = null;
        if (data.reservation_date) {
            isoDate = formatDateToIsoMidDay({ date: data.reservation_date });
        }

        if (currentStepIndex + 1 === 1) {
            setLoading(true);
            setError("reservation_date", "");
            axios
                .post(route("reservation.step-one"), {
                    reservation_date: isoDate,
                    id: data.id,
                })
                .then((response) => {
                    // Traiter les données de la réponse ici
                    // console.log(response.data);
                    setServices(response.data.data.services);
                    setTransformedServices(
                        response.data.data.transformedServices
                    );
                    return next();
                })
                .catch((error) => {
                    // console.log(error);
                    setError(error.response.data.errors);
                    return back();
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        if (currentStepIndex + 1 === 2) {
            if (transformedServices && transformedServices.length === 0) {
                toast.error("Aucun service disponible pour cette date");
                return;
            }

            setError("time", "");
            const servicesIds = services.map((service) => service.id);
            axios
                .post(route("reservation.step-two"), {
                    time: data.time,
                    id: data.id,
                    services: servicesIds,
                    guests: data.guests,
                    reservation_date: isoDate,
                })
                .then((response) => {
                    setTables(response.data.tables);
                    setData("service_id", response.data.matchingService.id);
                    if (response.data.tables.length === 0) {
                        toast.error("Aucune table disponible pour cette date");
                        // return;
                    }
                    next();
                })
                .catch((error) => {
                    // console.log(error.response.data.errors);
                    setError(error.response.data.errors);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        if (currentStepIndex + 1 === 3) {
            axios
                .post(route("reservation.step-three"), {
                    table_id: data.table_id,
                })
                .then((response) => {
                    // console.log(response.data);
                    next();
                })
                .catch((error) => {
                    // console.log(error.response.data.errors);
                    setError(error.response.data.errors);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        if (currentStepIndex + 1 === 4) {
            setLoading(true);
            axios
                .post(route("reservation.step-four"), {
                    table_id: data.table_id,
                    reservation_date: isoDate,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    time: data.time,
                    guests: data.guests,
                    service_id: data.service_id,
                })
                .then((response) => {
                    // Traiter les données de la réponse ici
                    // console.log(response.data);
                    next();
                })
                .catch((error) => {
                    // console.log(error.response.data.errors);
                    setError(error.response.data.errors);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    useEffect(() => {
        if (goNext && !isLastStep) {
            onSubmit();
            setGoNext(false);
        }
    }, [goNext]);

    useEffect(() => {
        if (currentStepIndex === 2) {
            setData("table_id", undefined);
        }
    }, [currentStepIndex]);

    const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
    const contactModalSetRestaurant = useContactRestaurantModal.use.setRestaurant();
    return (
        <ResaLayout
            title={
                !isLastStep ? (
                    "📆 Réservez votre table"
                ) : (
                    <div className="flex items-end gap-2 justify-center">
                        <PartySvg className="-translate-y-1 w-8 h-8" />{" "}
                        <h2 className="">Bravo !</h2>{" "}
                        <PartySvg className="-translate-y-1 w-8 h-8" />
                    </div>
                )
            }
            name={
                !isLastStep
                    ? restaurant.name
                    : "Votre réservation est prise en compte"
            }
        >
            <Head title="Réservation" />

            <form onSubmit={onSubmit}>
                <div className="space-y-5">
                    {step}
                    {!isLastStep && (
                        <div className="grid grid-cols-5 gap-2">
                            {!isFirstStep ? (
                                <Button
                                    type="button"
                                    onClick={back}
                                    className="w-full col-span-2"
                                >
                                    Retour
                                </Button>
                            ) : (
                                <div className="col-span-2 w-full"></div>
                            )}
                       

                            {(currentStepIndex === 1 && transformedServices &&
                                transformedServices.length === 0) || (currentStepIndex === 2 && tables && tables.length === 0) ? (
                                <Button
                                    variant={"primaryBlue"}
                                    className="w-full col-span-3 text-white"
                                    type="button"
                                    onClick={() => {
                                        contactModalOnOpen()
                                        contactModalSetRestaurant(restaurant)
                                    }}
                                >
                                    Contacter le restaurant
                                </Button>
                            ) : (
                               <>
                                <small className="text-center self-center">
                                {currentStepIndex + 1} / {steps.length}
                            </small>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="w-full col-span-2"
                                    disabled={
                                        processing ||
                                        (transformedServices &&
                                            transformedServices.length === 0) ||
                                        currentStepIndex + 1 === 3 ||
                                        loading
                                    }
                                >
                                    {currentStepIndex === 3
                                        ? "Confirmer"
                                        : "Suivant"}
                                </Button>
                               </>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </ResaLayout>
    );
};

export default Index;

const UserInputs = ({
    data,
    setData,
    errors,
}: {
    data: any;
    setData: any;
    errors: any;
}) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormFieldLayout
                    fieldName="first_name"
                    label="Prénom"
                    error={errors.first_name}
                >
                    <Input
                        id="first-name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        placeholder="Max"
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="last_name"
                    label="Nom"
                    error={errors.last_name}
                >
                    <Input
                        id="last-name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        placeholder="Robinson"
                    />
                </FormFieldLayout>
            </div>

            <FormFieldLayout
                fieldName="email"
                label="Prénom"
                error={errors.email}
            >
                <Input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                />
            </FormFieldLayout>
        </div>
    );
};

const Success = () => {
    return (
        <div className="space-y-4">
            {/* <div className="text-center">
                <p className="text-gray-500">
                    Nous avons bien reçu votre demande de réservation
                </p>
            </div> */}
        </div>
    );
};
