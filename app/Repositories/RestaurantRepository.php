<?php

namespace App\Repositories;

use App\Models\Restaurant;

class RestaurantRepository
{
    public function getAllMyRestaurants()
    {
        return Restaurant::where('owner_id', auth()->id())->get();
    }
}