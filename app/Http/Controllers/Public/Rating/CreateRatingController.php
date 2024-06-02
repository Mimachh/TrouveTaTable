<?php

namespace App\Http\Controllers\Public\Rating;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\Rating\CreateRatingRequest;
use App\Models\RatingRestaurant;
use App\Models\RatingToken;

class CreateRatingController extends Controller
{
    public function __invoke(CreateRatingRequest $request)
    {
        $data = $request->validated();
        $token = $data['token'];
        $tokenCheck = RatingToken::where('token', $token)->first();

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

    }
}
