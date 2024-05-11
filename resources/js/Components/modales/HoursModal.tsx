import { Modal } from "@/Components/ui/modal";
import { Button } from "../ui/button";
import { router, useForm } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";
import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import FormFieldLayout from "../layout/form-field-layout";
import { Input } from "../ui/input";
import { Services } from "@/types/services";
import { Loader } from "../loader";
import { TimeField } from "../TimePicker/time-field";
import { useDatePickerState } from "react-stately";
import { TimeValue } from "react-aria";
import { Separator } from "../ui/separator";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    title: string;
    description: string;
    id?: number | null;
    restaurant: Restaurant;
    can: {
        deleteRestaurantService: boolean;
    };
}

const HoursModal = (props: Props) => {
    const {
        isOpen,
        onClose,
        loading,
        title,
        description,
        id,
        restaurant,
        setLoading,
        can
    } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        day_id: id,
        services: [{ id: null, name: "", start_time: "", end_time: "" }],
    });

    const [services, setServices] = useState(data.services);

    const addField = () => {
        setServices([
            ...services,
            { id: null, name: "", start_time: "", end_time: "" },
        ]);
        setData("services", [
            ...data.services,
            { id: null, name: "", start_time: "", end_time: "" },
        ]);
    };
    const removeField = (index: number, serviceId: number | null) => {
        if(serviceId && !can.deleteRestaurantService) {
            toast.error("Vous n'avez pas la permission de supprimer ce service");
            return;
        }
        setServices((prevServices) => {
            const newFields = [...prevServices];
            newFields.splice(index, 1);
            return newFields;
        });
        setData((prevData) => {
            const newFields = [...prevData.services];
            newFields.splice(index, 1);
            return { ...prevData, services: newFields };
        });
    };

    const timeState = useDatePickerState({ granularity: "minute" });

    useEffect(() => {
        if (id !== null && id !== undefined) {
            axios
                .get(`/${restaurant.id}/getHoursByDayId/${id}`)
                .then((res) => {
                    const services = res.data.map((service: Services) => ({
                        id: service.id,
                        name: service.name,
                        start_time: service.start_time,
                        end_time: service.end_time,
                    }));
                    setData({
                        services: services,
                        day_id: id,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    }, [id]);

    // useEffect(() => {
    //     if (!loading) {
    //         setData("day_id", id);
    //     }
    // }, [loading]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("dashboard.hours.store", { restaurant: restaurant.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success("Les horaires ont été enregistrés");
            },
            onError: (e) => {
                toast.error("Une erreur s'est produite");
            },
        });
    };

    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
            dialogContentClasses="max-w-2xl"
        >
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <>
                    <form onSubmit={submit}>
                        <div>
                            {data.services.map((service, index) => (
                                <div key={index} className="">
                                    <div className="flex items-end gap-1 w-full">
                                        <FormFieldLayout
                                            className="w-full"
                                            label="Nom du service"
                                            fieldName={service.name}
                                            error={
                                                // @ts-ignore
                                                errors?.[
                                                    `services.${index}.name`
                                                ]
                                            }
                                        >
                                            <Input
                                                id={service.name}
                                                type="text"
                                                name="name"
                                                placeholder="Nom du service"
                                                value={service.name}
                                                className="mt-1 block w-full py-3 border"
                                                onChange={(e) => {
                                                    const newFields = [
                                                        ...data.services,
                                                    ];
                                                    newFields[index].name =
                                                        e.target.value;
                                                    // setServices(newFields);
                                                    setData(
                                                        "services",
                                                        newFields
                                                    );
                                                }}
                                            />
                                        </FormFieldLayout>

                                        <FormFieldLayout
                                            className="w-full"
                                            fieldName={service.start_time}
                                            error={
                                                // @ts-ignore
                                                errors?.[
                                                    `services.${index}.start_time`
                                                ]
                                            }
                                            label="Ouverture"
                                        >
                                            <TimeField
                                                label="Ouverture du restaurant"
                                                value={formatHours(
                                                    service.start_time
                                                )}
                                                onChange={(value) => {
                                                    timeState.setTimeValue(
                                                        value
                                                    );
                                                    const { hour, minute } =
                                                        value;
                                                   
                                                    const time = `${hour
                                                        .toString()
                                                        .padStart(
                                                            2,
                                                            "0"
                                                        )}:${minute
                                                        .toString()
                                                        .padStart(2, "0")}:00`;
                                                    const newFields = [
                                                        ...data.services,
                                                    ];
                                                    newFields[
                                                        index
                                                    ].start_time = time;
                                                    // setServices(newFields);
                                                    setData(
                                                        "services",
                                                        newFields
                                                    );
                                                }}
                                            />
                                        </FormFieldLayout>

                                        <FormFieldLayout
                                            className="w-full"
                                            fieldName={service.end_time}
                                            error={
                                                       // @ts-ignore
                                                errors?.[
                                                    `services.${index}.end_time`
                                                ]
                                            }
                                            label="Fermeture"
                                        >
                                            <TimeField
                                                label="Fermeture du restaurant"
                                                value={formatHours(
                                                    service.end_time
                                                )}
                                                onChange={(value) => {
                                                    timeState.setTimeValue(
                                                        value
                                                    );
                                                    const { hour, minute } =
                                                        value;
                                                 
                                                    const time = `${hour
                                                        .toString()
                                                        .padStart(
                                                            2,
                                                            "0"
                                                        )}:${minute
                                                        .toString()
                                                        .padStart(2, "0")}:00`;
                                                    const newFields = [
                                                        ...data.services,
                                                    ];
                                                    newFields[index].end_time =
                                                        time;
                                                    // setServices(newFields);
                                                    setData(
                                                        "services",
                                                        newFields
                                                    );
                                                }}
                                            />
                                        </FormFieldLayout>

                                        <Button
                                            type="button"
                                            onClick={() => removeField(index, service.id)}
                                            className="h-10 text-destructive hover:text-destructive/80"
                                            variant={"ghost"}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Separator className="my-3" />
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={addField}
                                size={"sm"}
                                variant={"secondary"}
                                className="w-full flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Ajouter un service
                            </Button>
                        </div>

                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button
                                disabled={loading || processing}
                                variant="outline"
                                onClick={onClose}
                            >
                                Annuler
                            </Button>
                            <Button
                                disabled={processing || loading}
                                
                            >
                                Confirmer
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
};

export default HoursModal;

const formatHours = (time: string) => {
    const [hourString, minuteString, secondString] = time.split(":");

    const timeObject = {
        hour: parseInt(hourString, 10),
        minute: parseInt(minuteString, 10),
        second: parseInt(secondString, 10),
        millisecond: 0,
    };

    return timeObject as TimeValue;
};
