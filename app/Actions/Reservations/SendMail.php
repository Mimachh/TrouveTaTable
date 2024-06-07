<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use App\Actions\FormatDate;
use App\Actions\FormatTime;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\RestaurantResource;
use App\Mail\Reservation\ChangeStatusMail;
use App\Mail\Reservation\ReservationCreatedMail;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Repositories\MailRepository;
use Illuminate\Support\Facades\Mail;

class SendMail
{
    public function AfterStatusChange(
        Restaurant $restaurant, 
        string $email, 
        Reservation $reservation, 
        string $status, 
        string $reason)
        : void
    {

        $checkIfCan = (new MailRepository())->isRestaurantCanSendReservationMail($restaurant);
        if(!$checkIfCan) {
            return;
        }

        $restaurant = new RestaurantResource($restaurant);

        $reservationResource = new ReservationResource(Reservation::find($reservation->id));
        $reservationResource["reservation_date"] = (new FormatDate())->dmY($reservationResource["reservation_date"]);
        $reservationResource['time'] = (new FormatTime())->hoursAndMinutesWithH($reservationResource['time']);
        
        Mail::to($email)->queue(new ChangeStatusMail(
            $restaurant,
            $reservationResource,
            $status,
            $reason
        ));
    }

    public function AfterCreated(
        Restaurant $restaurant,
        Reservation $reservation, 
        )
        : void
    {

        $checkIfCan = (new MailRepository())->isRestaurantCanSendReservationMail($restaurant);
        if(!$checkIfCan) {
            return;
        }
        
        $restaurant = new RestaurantResource($restaurant);

        $reservationResource = new ReservationResource(Reservation::find($reservation->id));
        $reservationResource["reservation_date"] = (new FormatDate())->dmY($reservationResource["reservation_date"]);
        $reservationResource['time'] = (new FormatTime())->hoursAndMinutesWithH($reservationResource['time']);
        
        Mail::to($reservation['email'])->queue(new ReservationCreatedMail(
            $restaurant,
            $reservationResource
        ));
    }
}