<?php

namespace App\Http\Resources;

use App\Actions\FormatDate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "phone" => $this->phone,
            // "reservation_date" => \Carbon\Carbon::parse($this->reservation_date)->format('d-m-Y'),
            "reservation_date" => (new FormatDate())->dmY($this->reservation_date),
            "time" => $this->time,
            "service_id" => $this->service_id,
            "table_id" => $this->table_id,
            "guests" => $this->guests,
            "status" => $this->status,
            "table" => new TableResource($this->table),
        ];
    }
}
