<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Support\Facades\Storage;

class DeleteBannerRestaurantController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository) {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function __invoke(Restaurant $restaurant)
    {
        $banner = $restaurant->banner;
        if($banner && auth()->user()->can('updateBanner', $restaurant)) {
            $reformatPath = $this->restaurantRepository->reformatFileURL($restaurant->banner);
            Storage::disk('public')->delete($reformatPath);
            $restaurant->update(['banner' => null]);
        } 
    }
}
