import { format } from "date-fns";
import { capitalizeFirstLetter } from "./capitalize";
import { fr } from "date-fns/locale";


const days = [
    {
        id: 1,
        name: "Lundi",
    },
    {
        id: 2,
        name: "Mardi",
    },
    {
        id: 3,
        name: "Mercredi",
    },
    {
        id: 4,
        name: "Jeudi",
    },
    {
        id: 5,
        name: "Vendredi",
    },
    {
        id: 6,
        name: "Samedi",
    },
    {
        id: 7,
        name: "Dimanche",
    },
];

export const getSelectedDayIndex = (
    selectedDay: Date,
) => {
    const day = days.find(
        (day) =>
            day.name ===
            capitalizeFirstLetter(
                format(selectedDay, "EEEE", { locale: fr })
            )
    );
    return day?.id ?? 1;
};