<?php

namespace App\Http\Controllers\Api\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Repositories\RestaurantRepository;
use Illuminate\Http\Request;

class GetAllMyRestaurants extends Controller
{
    private $restaurantRepository;

    public function __construct(RestaurantRepository $restaurantRepository)
    {
        $this->restaurantRepository = $restaurantRepository;
    }
    
    public function __invoke(Request $request)
    {
        $restaurants = $this->restaurantRepository->getAllMyRestaurants();
        $restaurantsResource = RestaurantResource::collection($restaurants);

        return response()->json($restaurantsResource);
    }
}
