<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Support\Facades\Storage;

class DeleteAvatarRestaurantController extends Controller
{
    public $restaurantRepository;
    public function __construct(RestaurantRepository $restaurantRepository) {
        $this->restaurantRepository = $restaurantRepository;
    }
    
    public function __invoke(Restaurant $restaurant)
    {
    
        $avatar = $restaurant->avatar;
       
        if($avatar && auth()->user()->can('updateAvatar', $restaurant)) {
            $reformatURL = $this->restaurantRepository->reformatFileURL($restaurant->avatar);
            Storage::disk('public')->delete($reformatURL);
            $restaurant->update(['avatar' => null]);
        } 
    }
}
