<?php

namespace App\Http\Controllers\Public\Rating;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class CreateTokenController extends Controller
{
    public function __invoke(Request $request)
    {
        $reservation = Reservation::first();
        $restaurant = $reservation->table->restaurant;

        $token = bin2hex(random_bytes(32));
        \App\Models\RatingToken::create([
            'email' => $reservation->email,
            'token' => $token,
            'restaurant_id' => $restaurant->id,
            'reservation_id' => $reservation->id,
            'expires_at' => now()->addDays(7)
        ]);
    }
}
