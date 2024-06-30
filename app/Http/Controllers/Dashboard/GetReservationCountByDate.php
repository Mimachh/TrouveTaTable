<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use App\Repositories\ReservationRepository;

class GetReservationCountByDate extends Controller
{
    private $reservationRepository;
    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function __invoke(Restaurant $restaurant, string $date)
    {
        $reservations = $this->reservationRepository->GetCountByDateByService($restaurant, $date);
        return ApiResponse::ok(["reservations" => $reservations]);
    }
}
