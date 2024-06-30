<?php

namespace App\Repositories;

use App\Actions\FormatDate;
use App\Http\Resources\ReservationResource;
use App\Models\Restaurant;
use Carbon\Carbon;

class ReservationRepository
{
    public function ShowByDate(Restaurant $restaurant, string $date)
    {
        return $restaurant->load(['reservations' => function ($query) use ($date) {
            $query->whereDate('reservation_date', (new FormatDate())->Ymd($date));
        }, 'services']);  
    }

    public function GetByDateOrderByService(Restaurant $restaurant, string $date) 
    {
        $restaurant = $this->ShowByDate($restaurant, $date);
        $services = $restaurant->services;
     
        $reservations = $restaurant->reservations->sortBy('service_id')->groupBy('service_id')->map(function ($group, $serviceId) use ($services) {
            $service = $services->firstWhere('id', $serviceId);
            $group = $group->sortBy(function ($reservation) {
                return Carbon::createFromFormat('H:i:s', $reservation->time);
            });
            return [
                'service' => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'start_time' => $service->start_time,
                    "end_time" => $service->end_time,
                ],
                'reservations' => ReservationResource::collection($group),
            ];
        })->sortBy(function ($item) {
            return $item['service']['start_time'];
        });

        return $reservations;
    }

    public function GetCountByDateByService(Restaurant $restaurant, string $date) 
    {
        $restaurant = $this->ShowByDate($restaurant, $date);
        $services = $restaurant->services;
     
        $reservations = $restaurant->reservations->sortBy('service_id')->groupBy('service_id')->map(function ($group, $serviceId) use ($services) {
            $service = $services->firstWhere('id', $serviceId);
            return [
                'service' => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'start_time' => $service->start_time,
                    "end_time" => $service->end_time,
                ],
                'count' => $group->count(),
            ];
        })->sortBy(function ($item) {
            return $item['service']['start_time'];
        });

        return $reservations;
    }
}