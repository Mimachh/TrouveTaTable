<?php

namespace App\Repositories;

use App\Actions\FormatDate;
use App\Enums\TableStatus;
use App\Models\Reservation;
use App\Models\Table;

class TableRepository
{
    public function getFreeTables($reservation_date, $service_id, $guests, $restaurant_id)
    {
        $current_resa_date_format = (new FormatDate)->Ymd($reservation_date);
        
        $res_table_ids = Reservation::where('status', "accepté")->orderBy('reservation_date')->get()->filter(function ($value) use ($current_resa_date_format, $service_id) {
            $valueDateFormat = (new FormatDate)->Ymd($value->reservation_date);
            return $valueDateFormat == $current_resa_date_format && $value->service_id == $service_id;
        })->pluck('table_id');

        $tables = Table::where('status', TableStatus::AVAILABLE->value)
            ->where('seats', '>=', $guests)
            ->where('restaurant_id', $restaurant_id)
            ->whereNotIn('id', $res_table_ids)->get();

        return $tables;
    }
}