<?php 

declare(strict_types=1);

namespace App\Actions\Restaurant;

use App\Mail\Contact\RestaurantContacted;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Mail;

class Contact {
    public function sendMail(Restaurant $restaurant)
    {
        Mail::to($restaurant->email)->queue(new RestaurantContacted(
            $restaurant,
        ));
    }
}