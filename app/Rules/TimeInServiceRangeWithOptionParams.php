<?php

namespace App\Rules;

use App\Actions\Services\FormatServices;
use App\Models\Restaurant;
use App\Models\Service;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TimeInServiceRangeWithOptionParams implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $services = Service::findMany(request('services'));
        $time = strtotime($value);
        $validServicesCount = 0;


        // element if it's today to compare.
        // $date = Carbon::parse(request('reservation_date'));
        // $date->setLocale('fr');
    
        // $today = Carbon::today();
        // $today->setLocale(config('app.locale'));


        // if ($today->isSameDay($date)) {
        //     $restaurant_id = $services->first()->restaurant_id;
        //     $restaurant = Restaurant::with('services')->findOrFail($restaurant_id);

        //     $serviceWithOption = (new FormatServices)->filterOffTheServiceWhenEndReservationIsPastToday($services, request('reservation_date'), $restaurant);

        //     foreach ($serviceWithOption as $service) {
        //         $startTime = strtotime((new FormatServices)->getTheStartTimeWithOption($service->start_time, $restaurant->time_before_service));
        //         $endTime = strtotime((new FormatServices)->getTheEndTimeWithOption($service->end_time, $restaurant->time_after_service));

        //         if ($time >= $startTime && $time <= $endTime) {
        //             $validServicesCount++;
        //         }
        //     }

        // } else {
        //     foreach ($services as $service) {
        //         $startTime = strtotime($service->start_time);
        //         $endTime = strtotime($service->end_time);

        //         if ($time >= $startTime && $time <= $endTime) {
        //             $validServicesCount++;
        //         }
        //     }
        // }
        
        
        
        $restaurant_id = $services->first()->restaurant_id;
        $restaurant = Restaurant::with('services')->findOrFail($restaurant_id);

        $serviceWithOption = (new FormatServices)->filterOffTheServiceWhenEndReservationIsPastToday($services, request('reservation_date'), $restaurant);

        foreach ($serviceWithOption as $service) {
            $startTime = strtotime((new FormatServices)->getTheStartTimeWithOption($service->start_time, $restaurant->time_before_service));
            $endTime = strtotime((new FormatServices)->getTheEndTimeWithOption($service->end_time, $restaurant->time_after_service));

            if ($time >= $startTime && $time <= $endTime) {
                $validServicesCount++;
            }
        }

        if ($validServicesCount === 0) {
            $fail(trans('validation.custom.between-time'));
        }
    }
}
