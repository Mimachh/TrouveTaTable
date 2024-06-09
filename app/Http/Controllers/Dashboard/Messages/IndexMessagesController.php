<?php

namespace App\Http\Controllers\Dashboard\Messages;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class IndexMessagesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant)
    {
        $restaurantResource = new RestaurantResource($restaurant);
        // $messagesResource = MessageResource::collection($restaurant->messages()->latest()->paginate(10));
        $messagesResource = MessageResource::collection($restaurant->messages()->latest()->paginate(10));


        return inertia('Dashboard/Messages/Index', [
            'restaurant' => $restaurantResource,
            'messages' => $messagesResource,
            'can' => [
                'enableMessages' => auth()->user()->can('enableMessages', $restaurant),
            ]
        ]);
    }
}
