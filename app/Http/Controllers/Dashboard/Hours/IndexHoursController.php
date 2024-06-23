<?php

namespace App\Http\Controllers\Dashboard\Hours;

use App\Actions\Hours\GetHoursOfRestaurant;
use App\Http\Controllers\Controller;
use App\Http\Resources\DayResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Day;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class IndexHoursController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant)
    {
        $days = DayResource::collection(Day::all());

        $restaurantResource = new RestaurantResource($restaurant);
      
        $hours = (new GetHoursOfRestaurant)->planning($restaurantResource->services);
   
        return inertia('Dashboard/Hours/Index', [
            "restaurant" => $restaurantResource,
            "days" => $days,
            "hours" => $hours,
            "can" => [
                "deleteRestaurantService" => auth()->user()->can('deleteRestaurantService', $restaurant),
                "enableBookingForm" => auth()->user()->can('enableBookingForm', $restaurant),
            ]
        ]);
    }
}
