<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Repositories\RestaurantRepository;

class IndexSettingsController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $isMissingInfo = (new RestaurantRepository())->isRestaurantMissingInformation($restaurant);
        $restaurantResource = new RestaurantResource($restaurant);
        return inertia('Dashboard/Settings/Index', [
            'restaurant' => $restaurantResource,
            'isMissingInfo' => $isMissingInfo,
            'can' => [
                'update_settings' => auth()->user()->can('update_settings', $restaurant),
                'change_status' => auth()->user()->can('change_status', $restaurant),
            ]
        ]);
    }
}
