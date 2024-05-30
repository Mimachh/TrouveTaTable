import { Reservation } from "./reservation";
import { Services } from "./services";

export interface Restaurant {
    id: string;
    name: string;
    restaurant_link_book_form?: string;
    restaurant_link_page?: string;
    slug: string;
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
    accept_reservations: boolean;
    accept_messages: boolean;
    enable_page: boolean;
    days?: string;
    user_id: number;
    time_before_service?: string;
    avatar?: string;
    banner?: string;
    time_after_service?: string;
    time_to_stop_reservation?: string;
    reservations: Reservation[];
    services: Services[];
    transformedServices?: Services[]
    medias: Media[];
    rating: {
        itemsRating?: RatingByItem
        averageRating?: number;
        countRating?: number;
    }
}

interface Media {
    id: number;
    imageable_type: string;
    imageable_id_id?: number;
    imageable_uuid_id?: string;
    name: string;
    mime: string;
    path: string;
    size?: number;
}

interface RatingByItem {
    "Accueil": {
        average: number;
    },
    "Cadre et ambiance": {
        average: number;
    }
    "Propreté": {
        average: number;
    }
    "Qualité du repas": {
        average: number;
    }
}