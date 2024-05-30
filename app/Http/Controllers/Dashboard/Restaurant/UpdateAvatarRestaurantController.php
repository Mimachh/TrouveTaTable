<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Restaurant\UpdateAvatarRestaurantRequest;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Support\Facades\Storage;

class UpdateAvatarRestaurantController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository)
    {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function __invoke(UpdateAvatarRestaurantRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $avatar = $data['avatar'] ?? null;
        $this->restaurantRepository->uploadFile($avatar, $restaurant, 'avatar');
    }
}
