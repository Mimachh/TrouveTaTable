<?php

namespace App\Http\Controllers\Reservation;

use App\Actions\FindServiceByTime;
use App\Actions\FormatDate;
use App\Actions\Services\FormatServices;
use App\Actions\Reservations\SendMail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StepFourRequest;
use App\Http\Requests\Reservation\StepOneRequest;
use App\Http\Requests\Reservation\StepThreeRequest;
use App\Http\Requests\Reservation\StepTwoRequest;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceWithOptionResource;
use App\Http\Responses\ApiResponse;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\Table;
use App\Repositories\TableRepository;
use Carbon\Carbon;


class StoreController extends Controller
{
    public $tableRepository;

    public function __construct(TableRepository $tableRepository)
    {
        $this->tableRepository = $tableRepository;
    }

    public function stepOne(StepOneRequest $request)
    {
        $date = Carbon::parse($request->get('reservation_date'));
        $date->setLocale('fr');
        // $dayOfWeek = $date->isoFormat('dddd');

        $today = Carbon::today();
        $today->setLocale('fr');

        $dayOfWeekIndex = $date->dayOfWeek;
        $restaurant = Restaurant::with('services')->findOrFail($request->get('id'));
        $services = $restaurant->services->where('day_id', $dayOfWeekIndex);

        // $servicesWithOptions = ServiceWithOptionResource::collection($services);

        // $now = Carbon::now();
        // $now->setLocale(config('app.locale'));
        // $now->setTimezone('UTC');
        // $currentTime = $now->isoFormat('HH:mm');
        // $stop_time_reservation = substr($restaurant->time_to_stop_reservation, 0, 5);

        //retirer les services dont l'heure de fin de réservation est dépassée aujourd'hui
        // if ($today->isSameDay($date)) {
        //     $servicesWithOptionsArray = [];
        //     $servicesWithOptions->each(function ($service) use (&$servicesWithOptionsArray, &$currentTime, &$stop_time_reservation) {
        //         // $start_time = (new FormatServices)->getTheStartTimeWithOption($service->start_time, $stop_time_reservation);
        //         // le start time au dessus serait lié à l'heure du service..Moi je préfère mettre l'heure d'ouverture.
        //         $start_time = substr($service->start_time, 0, 5);
        //         list($hours, $minutes) = explode(':', $stop_time_reservation);
        //         $time_to_stop_in_seconds = $hours * 3600 + $minutes * 60;
        //         $endReservationTime = date('H:i', strtotime($start_time) - $time_to_stop_in_seconds);
        //         if ($endReservationTime > $currentTime) {
        //             $servicesWithOptionsArray[] = $service;
        //         }
        //     });
        
        //     $servicesWithOptions = $servicesWithOptionsArray;
        // }
        $servicesWithOptions = (new FormatServices)->filterOffTheServiceWhenEndReservationIsPastToday($services, $date, $restaurant);



        $servicesResource = ServiceResource::collection($services);

        return ApiResponse::ok([
            'services' => $servicesResource,
            "transformedServices" => $servicesWithOptions,
        ]);
    }

    public function stepTwo(StepTwoRequest $request)
    {

        $time = strtotime($request->get('time'));
        $services = Service::findMany($request->get('services'));


        $current_resa_date_format = (new FormatDate)->Ymd($request->get('reservation_date'));



        $matchingService = (new FindServiceByTime)->handle($services, $time);


        // $current_resa_date = $request->get('reservation_date');



        // return response()->json([
        //     'current_resa_date' => Reservation::orderBy('reservation_date')->get()->filter(function ($value) use ($current_resa_date_format, $matchingService) {
        //         $valueDateFormat = (new FormatDate)->Ymd($value->reservation_date);
        //         return $valueDateFormat == $current_resa_date_format && $value->service_id == $matchingService["id"];
        //     })->pluck('table_id'),
        // ]);


        $tables = $this->tableRepository->getFreeTables($request->get('reservation_date'), $matchingService["id"], $request->get('guests'), $request->get('id'));
        // $res_table_ids = Reservation::orderBy('reservation_date')->get()->filter(function ($value) use ($current_resa_date_format, $matchingService) {
        //     // return $value->reservation_date->format('Y-m-d') == $current_resa_date->format('Y-m-d');
        //     // return $value->reservation_date->format('Y-m-d') == $current_resa_date->format('Y-m-d') && $value->service_id == $matchingService["id"];
        //     $valueDateFormat = (new FormatDate)->Ymd($value->reservation_date);
        //     return $valueDateFormat == $current_resa_date_format && $value->service_id == $matchingService["id"];
        // })->pluck('table_id');

        // $tables = Table::where('status', TableStatus::AVAILABLE->value)
        //     ->where('seats', '>=', $request->get('guests'))
        //     ->where('restaurant_id', $request->get('id'))
        //     ->whereNotIn('id', $res_table_ids)->get();

        return response()->json([
            'matchingService' => $matchingService,
            'tables' => $tables,
            // 'res_table_ids' => $res_table_ids,
        ]);




        // $tables = Table::where('status', TableStatus::AVAILABLE->value)
        // ->where('restaurant_id', $request->get('id'))
        // ->where('seats', '>=', $request->get('guests'))
        // ->get();

        // $tableResource = TableResource::collection($tables);
        // return response()->json([
        //     'tables' => $tableResource, 
        // ]);
    }

    public function stepThree(StepThreeRequest $request)
    {
        $table = Table::findOrFail($request->get('table_id'));
        // $table->status = TableStatus::RESERVED->value;
        // $table->save();

        return response()->json([
            "ok"
        ]);
    }

    public function stepFour(StepFourRequest $request)
    {

        $reservationDate = Carbon::parse($request->reservation_date)->toDateString();

        // Ajoutez la date de réservation transformée à la liste des données validées
        $data = $request->validated();

        $data['reservation_date'] = $reservationDate;

        // Créez la réservation en utilisant les données transformées
        $reservation = Reservation::create($data);

        $restaurant = Table::where('id', $data['table_id'])->first()->restaurant;

        $restaurantMail = (new SendMail)->AfterCreated(
            $restaurant,
            $reservation
        );
        return response()->json([
            'reservation' => $reservation,
        ]);
    }
}
