<?php

namespace App\Http\Controllers\Dashboard\Rating;

use App\Http\Controllers\Controller;
use App\Http\Resources\RatingRestaurantResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;

class IndexRatingController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);

        $ratings = RatingRestaurantResource::collection($restaurant->notes()->with('reservation')->paginate(10));
        $countRating = $restaurant->notes()->count();
      
        $isMissingInfo = (new RestaurantRepository())->isRestaurantMissingInformation($restaurant);

        return inertia('Dashboard/Ratings/Index', [
            'restaurant' => $restaurantResource,
            'ratings' => $ratings,
            'countRating' => $countRating,
            'isMissingInfo' => $isMissingInfo,
            'can' => [
                'enable_rating' => auth()->user()->can('enable_rating', $restaurant),
            ]
        ]);
    }
}
