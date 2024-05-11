<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
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
            'description' => $this->description,
            'address' => $this->address,
            'city' => $this->city,
            'zip' => $this->zip,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'logo' => $this->logo,
            'cover' => $this->cover,
            'hours' => $this->hours,
            'active' => $this->active,
            'time_before_service' => $this->time_before_service,
            'time_after_service' => $this->time_after_service,
            'days' => $this->days,
            'user_id' => $this->user_id,
            'services' => ServiceResource::collection($this->services->sortBy('start_time')),
            'reservations' => $this->whenLoaded('reservations', function () {
                return ReservationResource::collection($this->reservations);
            }),
        ];
    }
}
