import FormFieldLayout from "@/Components/layout/form-field-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Restaurant } from "@/types/restaurant";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";



const tamponBefore = [
    {
        id: 1,
        time: "00:00:00",
        label: "A l'heure de l'ouverture",
    },
    {
        id: 2,
        time: "00:15:00",
        label: "15 min après l'ouverture",
    },
    {
        id: 3,
        time: "00:30:00",
        label: "30 min après l'ouverture",
    },
    {
        id: 4,
        time: "00:45:00",
        label: "45 min après l'ouverture",
    },
    {
        id: 5,
        time: "01:00:00",
        label: "1h après l'ouverture",
    },
];

const tamponAfter = [
    {
        id: 1,
        time: "00:00:00",
        label: "A l'heure de la fermeture",
    },
    {
        id: 2,
        time: "00:15:00",
        label: "15 min avant la fermeture",
    },
    {
        id: 3,
        time: "00:30:00",
        label: "30 min avant la fermeture",
    },
    {
        id: 4,
        time: "00:45:00",
        label: "45 min avant la fermeture",
    },
    {
        id: 5,
        time: "01:00:00",
        label: "1h avant la fermeture",
    },
];

interface Props {
    restaurant: Restaurant
}

interface Tampon {
    time_before_service: string | null;
    time_after_service: string | null;
}
const SelectTamponService = ({restaurant}: Props) => {


    const [tampon, setTampon] = useState<Tampon>({
        time_before_service: restaurant.time_before_service ?? null,
        time_after_service: restaurant.time_after_service ?? null,
    });
    const [errors, setErrors] = useState({
        time_before_service: "",
        time_after_service: "",
    });
    const submit = (newTampon: Tampon) => { 
        setErrors({
            time_before_service: "",
            time_after_service: "",
        });   
        axios.put(`/dashboard/${restaurant.id}/hours/storeTamponDuration`, newTampon).then((response) => {
            console.log(response)
            toast.success("Horaires de service ajustés !");
        }).catch((error) => {
            toast.error("Une erreur est survenue, veuillez réessayer plus tard");
            setErrors(error.response.data.errors);
            // console.log(error)
        })
    };
    return (
        <Card
            x-chunk="dashboard-05-chunk-3"
            className="md:col-span-1 bg-accent h-fit"
        >
            <CardHeader className="px-7">
                <CardTitle>Services</CardTitle>
                <CardDescription>
                    Gérez le début et la fin de vos services par rapport aux heures d'ouverture.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Début du service"
                    fieldName="table_id"
                    error={errors.time_before_service ?? ""}
                    className="w-full"
                >
                    <Select
                        onValueChange={(e) => {
                            setTampon(prevTampon => {
                                const newTampon = {...prevTampon, time_before_service: e};
                                submit(newTampon);
                                return newTampon;
                            });
                        }}
                        defaultValue={tampon.time_before_service ?? "00:00:00"}
                        
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Début du service"
                            />
                        </SelectTrigger>
                        <SelectContent id="table">
                            {tamponBefore.map((item) => (
                                <SelectItem
                                key={item.id}
                                value={item.time}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormFieldLayout>
                <FormFieldLayout
                    className="w-full"
                    label="Fin du service"
                    fieldName="table_id"
                    error={errors.time_after_service ?? ""}
                >
                    <Select
                         onValueChange={(e) => {
                            setTampon(prevTampon => {
                                const newTampon = {...prevTampon, time_after_service: e};
                                submit(newTampon);
                                return newTampon;
                            });
                        }}
                        defaultValue={tampon.time_after_service ?? "00:00:00"}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Fin du service"
                            />
                        </SelectTrigger>
                        <SelectContent id="table">
                            {tamponAfter.map((item) => (
                                <SelectItem 
                                key={item.id}
                                value={item.time}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormFieldLayout>
            </CardContent>
        </Card>
    );
};

export default SelectTamponService;
