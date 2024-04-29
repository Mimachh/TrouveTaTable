<?php

namespace App\Http\Controllers\Reservation;

use App\Actions\findServiceByTime;
use App\Actions\FormatDate;
use App\Enums\TableStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StepFourRequest;
use App\Http\Requests\Reservation\StepOneRequest;
use App\Http\Requests\Reservation\StepThreeRequest;
use App\Http\Requests\Reservation\StepTwoRequest;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TableResource;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function stepOne(StepOneRequest $request)
    {
        $date = Carbon::parse($request->get('reservation_date'));
        $date->setLocale('fr');
        $dayOfWeek = $date->isoFormat('dddd');

        $dayOfWeekIndex = $date->dayOfWeek;
        $restaurant = Restaurant::with('services')->findOrFail($request->get('id'));
        $services = $restaurant->services->where('day_id', $dayOfWeekIndex);

        // $restaurant = Restaurant::with('days.services')->findOrFail($request->get('id'));
        // $services = $restaurant->days->where('id', $dayOfWeekIndex)->first()->services;
        $servicesResource = ServiceResource::collection($services);

        return response()->json([
            'services' => $servicesResource
        ]);
    }

    public function stepTwo(StepTwoRequest $request)
    {

        $time = strtotime($request->get('time'));
        $services = Service::findMany($request->get('services'));
        $matchingService = (new findServiceByTime)->handle($services, $time);

        // $current_resa_date = $request->get('reservation_date');

        $current_resa_date_format = (new FormatDate)->Ymd($request->get('reservation_date'));

        // return response()->json([
        //     'current_resa_date' => Reservation::orderBy('reservation_date')->get()->filter(function ($value) use ($current_resa_date_format, $matchingService) {
        //         $valueDateFormat = (new FormatDate)->Ymd($value->reservation_date);
        //         return $valueDateFormat == $current_resa_date_format && $value->service_id == $matchingService["id"];
        //     })->pluck('table_id'),
        // ]);

        $res_table_ids = Reservation::orderBy('reservation_date')->get()->filter(function ($value) use ($current_resa_date_format, $matchingService) {
            // return $value->reservation_date->format('Y-m-d') == $current_resa_date->format('Y-m-d');
            // return $value->reservation_date->format('Y-m-d') == $current_resa_date->format('Y-m-d') && $value->service_id == $matchingService["id"];
            $valueDateFormat = (new FormatDate)->Ymd($value->reservation_date);
            return $valueDateFormat == $current_resa_date_format && $value->service_id == $matchingService["id"];
        })->pluck('table_id');

        $tables = Table::where('status', TableStatus::AVAILABLE->value)
            ->where('seats', '>=', $request->get('guests'))
            ->where('restaurant_id', $request->get('id'))
            ->whereNotIn('id', $res_table_ids)->get();

        return response()->json([
            'matchingService' => $matchingService,
            'tables' => $tables,
            'res_table_ids' => $res_table_ids,
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
        return response()->json([
            'reservation' => $reservation,
        ]);
    }
}
