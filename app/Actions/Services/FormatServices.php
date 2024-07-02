<?php

declare(strict_types=1);

namespace App\Actions\Services;

use App\Http\Resources\ServiceWithOptionResource;
use App\Models\Restaurant;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class FormatServices
{

    public function getTheStartTimeWithOption($start_time, $time_before_service)
    {
        $start_service = $time_before_service ? substr($time_before_service, 0, 5) : null;

        if ($start_service) {
            $startTimeInSeconds = strtotime($start_time) - strtotime('TODAY');
            $startServiceInSeconds = strtotime($start_service) - strtotime('TODAY');
            $newStartTimeInSeconds = $startTimeInSeconds + $startServiceInSeconds;
            $newStartTime = date('H:i', strtotime('TODAY') + $newStartTimeInSeconds);

            return substr($newStartTime, 0, 5);
        } else {
            // Sinon, utiliser les heures par défaut
            $newStartTime = $start_time;

            return substr($newStartTime, 0, 5);
        }
    }

    public function getTheEndTimeWithOption($end_time, $time_after_service)
    {
        $time_after_service = $time_after_service ? substr($time_after_service, 0, 5) : null;
        // return $time_after_service;
        if ($time_after_service) {
            $endTimeInSeconds = strtotime($end_time) - strtotime('TODAY');
            $endServiceInSeconds = strtotime($time_after_service) - strtotime('TODAY');
            $newEndTimeInSeconds = $endTimeInSeconds - $endServiceInSeconds;
            $newEndTime = date('H:i', strtotime('TODAY') + $newEndTimeInSeconds);

            return substr($newEndTime, 0, 5);
        } else {
            // Sinon, utiliser les heures par défaut
            $newEndTime = $end_time;

            return substr($newEndTime, 0, 5);
        }
    }


    public function filterOffTheServiceWhenEndReservationIsPastToday($services, $date_reservation_no_format, $restaurant)
    {
        $servicesWithOptions = ServiceWithOptionResource::collection($services);
        

        $date_reservation = Carbon::parse($date_reservation_no_format);
        $date_reservation->setLocale('fr');
        // $dayOfWeek = $date->isoFormat('dddd');

        $now = Carbon::now();
        $now->setLocale(config('app.locale'));
        $currentTime = $now->isoFormat('HH:mm');
        
        $today = Carbon::today();
        $today->setLocale('fr');
        
        // $now->setTimezone('UTC');
       
        // $stop_time_reservation = substr($restaurant->time_to_stop_reservation, 0, 5);
        $stop_time_reservation = $restaurant->time_to_stop_reservation ? substr($restaurant->time_to_stop_reservation, 0, 5) : null;
        
        if ($today->isSameDay($date_reservation)) {
            $servicesWithOptionsArray = [];
            $servicesWithOptions->each(function ($service) use (&$servicesWithOptionsArray, &$currentTime, &$stop_time_reservation) {
                // $start_time = (new FormatServices)->getTheStartTimeWithOption($service->start_time, $stop_time_reservation);
                // le start time au dessus serait lié à l'heure du service..Moi je préfère mettre l'heure d'ouverture.
                $start_time = $service->start_time ? substr($service->start_time, 0, 5) : null;
                
                // list($hours, $minutes) = explode(':', $stop_time_reservation);
                // $time_to_stop_in_seconds = $hours * 3600 + $minutes * 60;
                // $endReservationTime = date('H:i', strtotime($start_time) - $time_to_stop_in_seconds);
                // if ($endReservationTime > $currentTime) {
                //     $servicesWithOptionsArray[] = $service;
                // }

                if ($stop_time_reservation !== null) {
                    list($hours, $minutes) = explode(':', $stop_time_reservation);
                    $time_to_stop_in_seconds = $hours * 3600 + $minutes * 60;
                    $endReservationTime = date('H:i', strtotime($start_time) - $time_to_stop_in_seconds);
                    if ($endReservationTime > $currentTime) {
                        $servicesWithOptionsArray[] = $service;
                    }
                } else {
                    if($service->start_time > $currentTime) {
                        $servicesWithOptionsArray[] = $service;
                    }
                }
            });

            $servicesWithOptions = $servicesWithOptionsArray;
        }

        return $servicesWithOptions;
    }
}
