<?php

namespace App\Http\Controllers\Dashboard\Reservation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepOneRequest;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepThreeRequest;
use App\Http\Requests\Dashboard\Reservation\CreateReservationFromAdminStepTwoRequest;
use App\Http\Resources\TableResource;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use App\Repositories\TableRepository;


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
        // enregistrement ici
    }
}
