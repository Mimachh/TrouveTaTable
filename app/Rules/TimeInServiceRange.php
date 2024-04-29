<?php

namespace App\Rules;

use App\Models\Service;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TimeInServiceRange implements ValidationRule
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

        foreach ($services as $service) {
            $startTime = strtotime($service->start_time);
            $endTime = strtotime($service->end_time);

            if ($time >= $startTime && $time <= $endTime) {
                $validServicesCount++;
            }
        }

        if ($validServicesCount === 0) {
            $fail(trans('validation.custom.between-time'));
        }
    }
}

