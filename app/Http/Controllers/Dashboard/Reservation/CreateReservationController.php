<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Actions\Reservations\SendMail;
use App\Enums\ReservationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepOneRequest;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepThreeRequest;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepTwoRequest;
use App\Http\Resources\TableResource;
use App\Http\Responses\ApiResponse;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Repositories\TableRepository;
use Carbon\Carbon;

class CreateReservationController extends Controller
{
    public $tableRepository;

    public function __construct(TableRepository $tableRepository)
    {
        $this->tableRepository = $tableRepository;
    }

    public function getTables(CreateReservationFromAdminStepOneRequest $request, Restaurant $restaurant) {
        $data = $request->validated();
        $tables = TableResource::collection($this->tableRepository->getFreeTables($data['reservation_date'], $data['service_id'], $data['guests'], $restaurant->id));
        
        return ApiResponse::ok(['tables' => $tables]);
    }

    public function stepTwo(CreateReservationFromAdminStepTwoRequest $request, Restaurant $restaurant) {
        $data = $request->validated();
        
        return response()->json(['message' => 'ok'], 200);
    }

    public function stepThree(CreateReservationFromAdminStepThreeRequest $request, Restaurant $restaurant) {
        $data = $request->validated();

        $reservation = Reservation::create([
            'first_name' => $data['first_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'reservation_date' => Carbon::parse($request->reservation_date)->toDateString(),
            'time' => $data['time'],
            'status' => ReservationStatus::ACCEPTED->value,
            'service_id' => $data['service_id'] ?? null,
            'table_id' => $data['table_id'] ?? null,
            'guests' => $data['guests'] ?? null,
        ]);
        
        $restaurantMail = (new SendMail)->AfterCreated(
            $restaurant,
            $reservation
        );

    }
}
