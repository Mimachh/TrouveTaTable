import { Restaurant } from "@/types/restaurant";

export const isRestaurantMissInformation = (restaurant: Restaurant): boolean => {
    const isMissingInformation = (!restaurant.email || !restaurant.address || !restaurant.phone || !restaurant.city || !restaurant.zip) ? true : false;
    return isMissingInformation;
}



