<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Restaurant\UpdateBannerRestaurantRequest;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpdateBannerRestaurantController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository)
    {
        $this->restaurantRepository = $restaurantRepository;
    }
    
    public function __invoke(UpdateBannerRestaurantRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $banner = $data['banner'] ?? null;
        $this->restaurantRepository->uploadFile($banner, $restaurant, 'banner');
    }
}
