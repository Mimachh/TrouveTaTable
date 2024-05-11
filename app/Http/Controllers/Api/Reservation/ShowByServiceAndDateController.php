<?php

namespace App\Http\Controllers\Api\Reservation;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use App\Repositories\ReservationRepository;


class ShowByServiceAndDateController extends Controller
{

    private $reservationRepository;
    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function __invoke(Restaurant $restaurant, string $date): \App\Http\Responses\ApiResponse
    {
        $reservations = $this->reservationRepository->GetByDateOrderByService($restaurant, $date);
    
        return ApiResponse::ok(["reservations" => $reservations]);
    }
}
