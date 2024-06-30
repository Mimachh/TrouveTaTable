<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Reservations\Stats;
use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;

class GetStatsController extends Controller
{
    public function __invoke(Restaurant $restaurant)
    {
        $stats = (new Stats())->handle($restaurant);

        return ApiResponse::ok($stats);
    }
}
