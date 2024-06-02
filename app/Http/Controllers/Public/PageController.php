<?php

namespace App\Http\Controllers\Public;

use App\Actions\Hours\GetHoursOfRestaurant;
use App\Http\Controllers\Controller;
use App\Http\Resources\RatingRestaurantResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RatingRepository;
use App\Repositories\RestaurantRepository;

class PageController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository) 
    {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function __invoke(string $slug)
    {
        $restaurant = Restaurant::where('slug', $slug)->first();
        if(!$restaurant) {
            return inertia('Public/Restaurant/PageNotAvailable');
        }
        $canEnablePage = $this->restaurantRepository->isRestaurantCanEnablePage($restaurant);
        if(!$canEnablePage) {
            return inertia('Public/Restaurant/PageNotAvailable');
        }

        $restaurantResource = new RestaurantResource($restaurant->load('validNotes'));
        $hours = (new GetHoursOfRestaurant)->planning($restaurantResource->services);


        $avis = RatingRestaurantResource::collection(
            (new RatingRepository())->getLastAvisForARestaurant($restaurant)
        );

        return inertia('Public/Restaurant/RestaurantPage', [
            'restaurant' => $restaurantResource,
            'avis' => $avis,
            'hours' => $hours,
        ]);
    }
}
