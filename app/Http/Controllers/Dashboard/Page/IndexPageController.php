<?php

namespace App\Http\Controllers\Dashboard\Page;

use App\Actions\Hours\GetHoursOfRestaurant;
use App\Http\Controllers\Controller;
use App\Http\Resources\RatingRestaurantResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RatingRepository;
use Illuminate\Http\Request;

class IndexPageController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant->load('validNotes'));
        $hours = (new GetHoursOfRestaurant)->planning($restaurantResource->services);

        $avis = RatingRestaurantResource::collection(
            (new RatingRepository())->getLastAvisForARestaurant($restaurant)
        );
        
        return inertia('Dashboard/Page/Index', [
            'restaurant' => $restaurantResource,
            'hours' => $hours,
            'avis' => $avis,
            'can' => [
                'enablePage' => auth()->user()->can('enablePage', $restaurant),
                'updatePage' => auth()->user()->can('updatePage', $restaurant),
                'updateBanner' => auth()->user()->can('updateBanner', $restaurant),
                'updateAvatar' => auth()->user()->can('updateAvatar', $restaurant),
                'updateMedia' => auth()->user()->can('updateMedia', $restaurant),
            ],
        ]);
    }
}
