<?php

namespace App\Http\Controllers\Reservation;

use App\Actions\FindServiceByTime;
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
use App\Repositories\RestaurantRepository;
use App\Repositories\TableRepository;
use Carbon\Carbon;


class StoreController extends Controller
{
    public $tableRepository;
    public $restaurantRepository;
    public function __construct(TableRepository $tableRepository, RestaurantRepository $restaurantRepository)
    {
        $this->tableRepository = $tableRepository;
        $this->restaurantRepository = $restaurantRepository;
    }

    public function stepOne(StepOneRequest $request)
    {
        $restaurant = Restaurant::with('services')->findOrFail($request->get('id'));
        if ($this->restaurantRepository->isRestaurantCanAcceptReservation($restaurant)) {
            $servicesOfTheDay = $this->restaurantRepository->getServicesFromTheSelectedDate($restaurant, $request->get('reservation_date'));


            $servicesWithOptions = (new FormatServices)->filterOffTheServiceWhenEndReservationIsPastToday($servicesOfTheDay, $request->get('reservation_date'), $restaurant);
          
            $servicesResource = ServiceResource::collection($servicesOfTheDay);
            
            // $dayOfWeekIndex = $date->dayOfWeekIso; 
            // return $dayOfWeekIndex;






            
            return ApiResponse::ok([
                'services' => $servicesResource,
                "transformedServices" => $servicesWithOptions,

     
            ]);
        }


        return ApiResponse::forbidden('Restaurant can not accept reservation');
    }

    public function stepTwo(StepTwoRequest $request, Restaurant $restaurant)
    {
        if ($this->restaurantRepository->isRestaurantCanAcceptReservation($restaurant)) {
            $services = Service::findMany(request('services'));
            $date = Carbon::parse(request('reservation_date'));
            $date->setLocale('fr');
            $restaurant_id = $services->first()->restaurant_id;
            $restaurant = Restaurant::with('services')->findOrFail($restaurant_id);

            // $serviceWithOption = (new FormatServices)->filterOffTheServiceWhenEndReservationIsPastToday($services, $date, $restaurant);

            // $time = strtotime(request('time'));
            // $validServicesCount = 0;

            // $arrayStartAndEnd = [];
            // foreach ($serviceWithOption as $service) {
            //     $startTime = (new FormatServices)->getTheStartTimeWithOption($service->start_time, $restaurant->time_before_service);
            //     $startTimeToString = strtotime($startTime);
            //     $endTime = (new FormatServices)->getTheEndTimeWithOption($service->end_time, $restaurant->time_after_service);
            //     $endTimeToString = strtotime($endTime);
            //     array_push($arrayStartAndEnd, [$startTime, $endTime]);
            //     if ($time >= $startTimeToString && $time <= $endTimeToString) {
            //         $validServicesCount++;
            //     }
            // }
            $time = strtotime($request->get('time'));
            $services = Service::findMany($request->get('services'));
            $matchingService = (new FindServiceByTime)->handle($services, $time);
            $tables = $this->tableRepository->getFreeTables($request->get('reservation_date'), $matchingService["id"], $request->get('guests'), $request->get('id'));
            
            return ApiResponse::ok([
                'matchingService' => $matchingService,
                'tables' => $tables,
            ]);
        }


        return ApiResponse::forbidden('Restaurant can not accept reservation');
    }

    public function stepThree(StepThreeRequest $request, Restaurant $restaurant)
    {
        if ($this->restaurantRepository->isRestaurantCanAcceptReservation($restaurant)) {
            $table = Table::findOrFail($request->get('table_id'));
            if (!$table) {
                return ApiResponse::notFound(
                    'Table not found'
                );
            }
            return ApiResponse::ok([
                "ok"
            ]);
        }

        return ApiResponse::forbidden('Restaurant can not accept reservation');
    }

    public function stepFour(StepFourRequest $request, Restaurant $restaurant)
    {

        if ($this->restaurantRepository->isRestaurantCanAcceptReservation($restaurant)) {
            $reservationDate = Carbon::parse($request->reservation_date)->toDateString();
            $data = $request->validated();
            $data['reservation_date'] = $reservationDate;
            $reservation = Reservation::create($data);

            $restaurant = Table::where('id', $data['table_id'])->first()->restaurant;

            (new SendMail)->AfterCreated(
                $restaurant,
                $reservation
            );

            return ApiResponse::created([
                'reservation' => $reservation,
            ]);
        }

        return ApiResponse::forbidden('Restaurant can not accept reservation');
    }
}
