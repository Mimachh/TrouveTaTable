<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Actions\FormatDate;
use App\Actions\Reservations\SendMail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Reservation\ChangeReservationStatusRequest;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\RestaurantResource;
use App\Mail\Reservation\ChangeStatusMail;
use App\Models\Reservation;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ChangeReservationStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
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
