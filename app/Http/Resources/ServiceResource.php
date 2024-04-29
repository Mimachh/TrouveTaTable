<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'restaurant_id' => $this->restaurant_id,
            'day_id' => $this->day_id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
        ];
    }
}
