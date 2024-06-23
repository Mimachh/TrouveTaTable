<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Actions\Reservations\SendMail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Reservation\ChangeReservationStatusRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\Restaurant;


class ChangeReservationStatusController extends Controller
{
    public function __invoke(ChangeReservationStatusRequest $request, Restaurant $restaurant, Reservation $reservation)
    {
        $data = $request->validated();
        $reservationResource = new ReservationResource(Reservation::find($data['reservation_id']));
        $reservationResource->update([
            'status' => $data['status'],
            'reason' => $data['reason'],
        ]);

        $restaurantMail = (new SendMail)->AfterStatusChange(
            $restaurant,
            $reservation['email'],
            Reservation::where('id', $data['reservation_id'])->first(),
            $data['status'],
            $data['reason']
        );
    }
}
