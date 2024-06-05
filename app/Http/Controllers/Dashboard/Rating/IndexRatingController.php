<?php

namespace App\Http\Controllers\Dashboard\Rating;

use App\Http\Controllers\Controller;
use App\Http\Resources\RatingRestaurantResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;

class IndexRatingController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {  
        $restaurantResource = new RestaurantResource($restaurant);
       
        $ratings = RatingRestaurantResource::collection($restaurant->notes()->with('reservation')->paginate(10));
        $countRating = $restaurant->notes()->count();
        
        return inertia('Dashboard/Ratings/Index', [
            'restaurant' => $restaurantResource,
            'ratings' => $ratings,
            'countRating' => $countRating,
        ]);

    }
}
