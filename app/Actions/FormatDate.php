<?php

declare(strict_types=1);

namespace App\Actions;

use Carbon\Carbon;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class FormatDate
{
    public function Ymd($date)
    {
        $transformDate = Carbon::parse($date);
        return $transformDate->format('Y-m-d');
    }

    public function dmY($date)
    {
        $transformDate = Carbon::parse($date);
        return $transformDate->format('d-m-Y');
    }
}