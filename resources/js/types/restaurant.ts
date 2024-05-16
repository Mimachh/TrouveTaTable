import { Reservation } from "./reservation";
import { Services } from "./services";

export interface Restaurant {
    id: string;
    name: string;
    description?: string;
    address?: string;
    city?: string;
    zip?: string;
    phone?: string;
    email?: string;
    website?: string;
    logo?: string;
    cover?: string;
    hours?: string;
    active?: boolean;
    days?: string;
    user_id: number;
    time_before_service?: string;
    time_after_service?: string;
    time_to_stop_reservation?: string;
    reservations: Reservation[];
    services: Services[];
    transformedServices?: Services[]
}