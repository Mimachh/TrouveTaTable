<?php

declare(strict_types=1);

namespace App\Actions\Ratings;

use App\Http\Resources\UserResource;
use App\Mail\Rating\SendRatingMailToClient;
use App\Models\RatingToken;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class GenerateRatingMail
{
    public function handle() {
        $restaurantCanReceiveRating = $this->loopOverRestaurantsToGetThoseWhereReservationCanBeRated();
        $yesterdayReservations = $this->getYesterdayReservationByReservationCollection($restaurantCanReceiveRating);
        $this->generateTokenForEachReservationAndSendMail($yesterdayReservations);
        return $yesterdayReservations;
    }

    private function sendMailToClient(RatingToken $token): void
    {
        $reservation = $token->reservation;
       
        Mail::to($token->email)->send(new SendRatingMailToClient(
            $token,
            $reservation,
        ));
    }
    private function generateTokenForEachReservationAndSendMail($reservations): void
    {
        foreach ($reservations as $reservation) {
            $token = $this->generateToken($reservation);
            $this->sendMailToClient($token);
        }
    }
    public function generateToken(Reservation $reservation): RatingToken
    {
        $restaurant = $reservation->table->restaurant;

        $token = bin2hex(random_bytes(32));
        $ratingToken = RatingToken::create([
            'email' => $reservation->email,
            'token' => $token,
            'restaurant_id' => $restaurant->id,
            'reservation_id' => $reservation->id,
            'expires_at' => now()->addDays(7)
        ]);

        return $ratingToken;
    }

 
    private function loopOverRestaurantsToGetThoseWhereReservationCanBeRated()
    {
        $restaurantsEnable = Restaurant::ratingOpen()->active()->get();
        $reservationsByRestaurant = [];
        foreach ($restaurantsEnable as $restaurant) {
            $reservationsByRestaurant[] = $this->reservationsCanReceiveRating($restaurant);
        }

        return $reservationsByRestaurant;
    }

    public function getYesterdayReservationByReservationCollection($reservationsCollection)
    {
        $yesterdayReservations = [];
        if (empty($reservationsCollection)) {
            return;
        }
        foreach ($reservationsCollection as $reservations) {

            foreach ($reservations as $reservation) {
                $reservationDate = Carbon::parse($reservation->reservation_date);
                if ($reservationDate->isYesterday()) {
                    $yesterdayReservations[] = $reservation;
                }
            }
        }
        return $yesterdayReservations;
    }

    private function reservationsCanReceiveRating(Restaurant $restaurant): ?iterable
    {
        $proprio = $restaurant->owner;
        // ici il faut enlever je crois
        if (!$this->ownerCanEnableRating($proprio)) {
            return $restaurant->reservations;
        }
        return [];
    }

    private function ownerCanEnableRating($owner): bool 
    {
        return $owner->isSub($owner);


        // $user = new UserResource($owner->id);
        // return $user->isFondator();
    }
}