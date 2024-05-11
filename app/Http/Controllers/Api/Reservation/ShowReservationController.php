<?php

namespace App\Http\Controllers\Api\Reservation;

use App\Enums\ReservationStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Http\Responses\ApiResponse;
use App\Models\Reservation;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class ShowReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant, Reservation $reservation)
    {
        if(auth()->user()->can('view', $reservation)) {
            $reservationStatus = ReservationStatus::cases();
            
            return ApiResponse::ok(['reservation' => new ReservationResource($reservation), "reservationStatus" => $reservationStatus]);
        }
        return ApiResponse::forbidden();
    }
}
