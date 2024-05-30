<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageToRestaurantRequest;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class SendMessageToRestaurantController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SendMessageToRestaurantRequest $request)
    {
        $data = $request->validated();
        $restaurant = Restaurant::findOrFail($data['restaurant_id']);
        $restaurant->messages()->create($data);
        
    }
}
