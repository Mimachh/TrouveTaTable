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
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";



const tamponBefore = [
    {
        id: 1,
        time: "00:00:00",
        label: "Jusqu'à l'ouverture",
    },
    {
        id: 2,
        time: "00:15:00",
        label: "15 min avant l'ouverture",
    },
    {
        id: 3,
        time: "00:30:00",
        label: "30 min avant l'ouverture",
    },
    {
        id: 4,
        time: "00:45:00",
        label: "45 min avant l'ouverture",
    },
    {
        id: 5,
        time: "01:00:00",
        label: "1h avant l'ouverture",
    },
    {
        id: 6,
        time: "01:30:00",
        label: "1h30 avant l'ouverture",
    },
    {
        id: 7,
        time: "02:00:00",
        label: "2h avant l'ouverture",
    },
];

interface Props {
    restaurant: Restaurant
}

interface StopReservation {
    time_to_stop_reservation: string | null;
}
const StopReservation = ({restaurant}: Props) => {


    const [tampon, setTampon] = useState<StopReservation>({
        time_to_stop_reservation: restaurant.time_to_stop_reservation ?? null,
    });
    const [errors, setErrors] = useState({
        time_to_stop_reservation: "",
    });
    const submit = (timeStopReservation: StopReservation) => { 
        setErrors({
            time_to_stop_reservation: ""
        });   
        axios.put(`/dashboard/${restaurant.id}/hours/storeEndReservation`, timeStopReservation).then((response) => {
            // console.log(response)
            toast.success("Paramètre enregistré !");
        }).catch((error) => {
            toast.error("Une erreur est survenue, veuillez réessayer plus tard");
            setErrors(error.response.data.errors);
        })
    };
    return (
        <Card
            x-chunk="dashboard-05-chunk-3"
            className="md:col-span-1 bg-accent h-fit"
        >
            <CardHeader className="px-7">
                <CardTitle>Arrêt des réservations</CardTitle>
                <CardDescription>
                    Indiquez combien de temps avant un service, les réservations doivent s'arrêter.
                </CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <FormFieldLayout
                    label="Fin des réservations"
                    fieldName="time_to_stop_reservation"
                    error={errors.time_to_stop_reservation ?? ""}
                    className="w-full"
                >
                    <Select
                        onValueChange={(e) => {
                            setTampon(prevHours => {
                                const newTampon = {...prevHours, time_to_stop_reservation: e};
                                submit(newTampon);
                                return newTampon;
                            });
                        }}
                        defaultValue={tampon.time_to_stop_reservation ?? "00:00:00"}
                        
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Fin des réservations"
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
            </CardContent>
        </Card>
    );
};

export default StopReservation;
