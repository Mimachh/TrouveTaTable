<?php

namespace App\Http\Resources;

use App\Models\RatingRestaurantItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteRestaurantResource extends JsonResource
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
            "note" => $this->note,
            "item" => new RatingRestaurantItemResource($this->ratingRestaurantItem)
        ];
    }
}
