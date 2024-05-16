<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
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
        return inertia("Dashboard", [
            "restaurant" => new RestaurantResource($restaurant),
            "restaurants" => $restaurants,
        ]);
    }
}
