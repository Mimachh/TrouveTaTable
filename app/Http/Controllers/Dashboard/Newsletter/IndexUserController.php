<?php

namespace App\Http\Controllers\Dashboard\Newsletter;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsletterUserResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;

class IndexUserController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);
        $users = NewsletterUserResource::collection($restaurant->newsletter_users()->paginate(10));
        $countUser = $restaurant->newsletter_users()->count();
        return inertia('Dashboard/Newsletter/Users', [
            'restaurant' => $restaurantResource,
            'users' => $users,
            'countUser' => $countUser,
            'can' => [
                'unsubscribe' => auth()->user()->can('unsubscribeNewsletterUser', $restaurant),
            ],
        ]);
    }
}
