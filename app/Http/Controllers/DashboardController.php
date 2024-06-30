<?php

namespace App\Http\Controllers;

use App\Actions\Reservations\Stats;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;


class DashboardController extends Controller
{
    public function __invoke($restaurantId = null)
    {
        $restaurants = RestaurantResource::collection(Restaurant::where('owner_id', auth()->id())->active()->get());

        if (!$restaurantId) {
            $restaurant = Restaurant::where('owner_id', auth()->id())->oldest()->first();

            if ($restaurant) {
                return redirect()->route('dashboard', ['restaurant' => $restaurant->id]);
            }
        }

        $restaurant = Restaurant::find($restaurantId);
        $isMissingInfo = (new RestaurantRepository())->isRestaurantMissingInformation($restaurant);

        return inertia("Dashboard/Dashboard", [
            "restaurant" => new RestaurantResource($restaurant),
            "restaurants" => $restaurants,
            "isMissingInfo" => $isMissingInfo
        ]);
    }
}
