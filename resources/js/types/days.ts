import { Services } from "./services";

export interface Day {
    id: number;
    name: string;
}

export interface FormatedDayAndHour {
    day_id: number;
    day_name: string;
    services: Services[]
}