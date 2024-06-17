<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Restaurant\UpdateMediaRestaurantRequest;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;


class UpdateMediaRestaurantController extends Controller
{
    public $restaurantRepository;

    public function __construct(RestaurantRepository $restaurantRepository) {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function __invoke(UpdateMediaRestaurantRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $this->restaurantRepository->uploadMedia($data, $restaurant);
        return back();
    }
}
