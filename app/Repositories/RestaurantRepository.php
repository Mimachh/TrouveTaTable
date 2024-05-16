<?php

namespace App\Repositories;

use App\Models\Restaurant;
use Carbon\Carbon;

class RestaurantRepository
{
    public function getAllMyRestaurants()
    {
        return Restaurant::where('owner_id', auth()->id())->get();
    }

    public function getServicesFromTheSelectedDate(Restaurant $restaurant, $date) {
        $date = Carbon::parse($date);
        $date->setLocale('fr');
        $dayOfWeekIndex = $date->dayOfWeek;
        return $restaurant->services->where('day_id', $dayOfWeekIndex);
    }
}