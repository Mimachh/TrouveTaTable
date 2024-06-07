<?php

namespace App\Http\Controllers\Public\Contact;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;

class IndexRestaurantContactController extends Controller
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
        $canReceiveMessage = $this->restaurantRepository->isRestaurantAcceptMessage($restaurant);
        if(!$canReceiveMessage) {
            return inertia('Public/Restaurant/PageNotAvailable');
        }

        $restaurantResource = new RestaurantResource($restaurant);

        return inertia('Public/Contact/Index', [
            'restaurant' => $restaurantResource,
        ]);
    }
}
