<?php

declare(stric_types=1);

namespace App\Actions\Ratings;

use App\Http\Resources\RatingRestaurantResource;
use App\Mail\Rating\NewRatingNotifyRestaurant;
use App\Models\RatingRestaurant;
use App\Models\RatingToken;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Mail;

class CreateRating
{
    public function createRating($data): void
    {
        $token = $data['token'];
        $tokenCheck = RatingToken::where('token', $token)->first();

        $restaurant = Restaurant::where('id', $tokenCheck['restaurant_id'])->first();
        $ratingRestaurant = RatingRestaurant::create([
            'email' => $tokenCheck['email'],
            'restaurant_id' => $tokenCheck['restaurant_id'],
            'reservation_id' => $tokenCheck['reservation_id'],
            'comment' => $data['comment'],
            'isValid' => true
        ]);

        $notes = [];
        foreach ($data['notes'] as $note) {
            $notes[] = [
                'rating_restaurant_id' => $ratingRestaurant->id,
                'rating_restaurant_item_id' => $note['item_id'],
                'note' => $note['rate']
            ];
        }

        $ratingRestaurant->notes()->createMany($notes);
        $tokenCheck->delete();

        $this->sendMailToRestaurant($ratingRestaurant, $restaurant);

    }

    public function sendMailToRestaurant(RatingRestaurant $ratingRestaurant, Restaurant $restaurant): void
    {
        $ratingResource = new RatingRestaurantResource($ratingRestaurant);
        Mail::to($restaurant->email)->send(new NewRatingNotifyRestaurant(
            $restaurant,
            $ratingResource
        ));
    }
}