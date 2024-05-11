<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class IndexReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);
        return inertia('Dashboard/Reservation/Index', [
            "restaurant" => $restaurantResource,
        ]);
    }
}
