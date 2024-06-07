<?php 

declare(strict_types=1);

namespace App\Actions\Restaurant;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;

class RedirectIfCanNotAcceptReservation
{
    public function action(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);
        return inertia("Public/Reservation/RestaurantCanNotAcceptReservation", [
            'restaurant' => $restaurantResource,
        ]);
    }
}