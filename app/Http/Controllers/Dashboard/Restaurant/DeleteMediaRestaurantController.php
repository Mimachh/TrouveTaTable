<?php

namespace App\Http\Controllers\Dashboard\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Restaurant\DeleteMediaRestaurantRequest;
use App\Models\Media;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeleteMediaRestaurantController extends Controller
{

    public $restaurantRepository;

    public function __construct(RestaurantRepository $restaurantRepository) {
        $this->restaurantRepository = $restaurantRepository;
    }
    
    public function __invoke(DeleteMediaRestaurantRequest $request, Restaurant $restaurant)
    {
        $data = $request->validated();
        $this->restaurantRepository->deleteMedia($data);
    }
}
