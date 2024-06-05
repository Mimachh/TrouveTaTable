<?php

namespace App\Http\Resources;

use App\Repositories\RatingRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RatingRestaurantResource extends JsonResource
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
            "created_at" => $this->created_at,
            "email" => $this->email,
            "comment" => $this->comment,
            "notes" => NoteRestaurantResource::collection($this->notes),
            'isValid' => $this->isValid,
            "average" => (new RatingRepository())->getAverageForOneRating($this->notes),
            'reservation' => $this->whenLoaded('reservation', function () {
                return new ReservationResource($this->reservation);
            }),
            // 'reservation' => new ReservationResource($this->reservation),
        ];
    }
}
