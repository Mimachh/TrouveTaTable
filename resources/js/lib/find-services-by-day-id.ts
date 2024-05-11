import { Restaurant } from "@/types/restaurant";

export const findServicesByDayId = (dayId: number, restaurant: Restaurant) => {
    const services = restaurant.services.filter((service) => service.day_id === dayId);
    return services.length > 0 ? services : null;
}