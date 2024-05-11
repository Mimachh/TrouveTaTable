<?php

namespace App\Repositories;

use App\Models\Restaurant;

class RestaurantRepository
{
    public function getAllMyRestaurants()
    {
        return Restaurant::where('user_id', auth()->id())->get();
    }
}