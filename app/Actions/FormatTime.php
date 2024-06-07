<?php

declare(strict_types=1);

namespace App\Actions;

use Carbon\Carbon;

class FormatTime
{
    public function hoursAndMinutesWithH($hour)
    {
        $transformHour = Carbon::parse($hour);
        return $transformHour->format('H\hi');
    }

}