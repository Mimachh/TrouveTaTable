<?php

namespace App\Http\Resources;

use App\Actions\Services\FormatServices;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceWithOptionResource extends JsonResource
{

    public function toArray(Request $request): array
    {
    

        return [
            'id' => $this->id,
            'name' => $this->name,
            'restaurant_id' => $this->restaurant_id,
            'day_id' => $this->day_id,
            'start_time' => substr($this->start_time, 0, 5),
            'end_time' => substr($this->end_time, 0, 5),
            'time_to_stop_reservation' => substr($this->restaurant->time_to_stop_reservation, 0, 5),
            'start_time_with_option' => (new FormatServices)->getTheStartTimeWithOption($this->start_time, $this->restaurant->time_before_service),
            'end_time_with_option' => (new FormatServices)->getTheEndTimeWithOption($this->end_time, $this->restaurant->time_after_service)
        ];
    }
}
