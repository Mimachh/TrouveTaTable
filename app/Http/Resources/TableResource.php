<?php

namespace App\Http\Resources;

use App\Enums\TableStatus;
use IFresh\EnumTranslations\EnumTranslatorFacade;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    
    public function toArray(Request $request): array
    {
     
        $statusEnum = TableStatus::fromValue($this->status);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'seats' => $this->seats,
            "status" => EnumTranslatorFacade::translateValue(TableStatus::class, $statusEnum),
            'restaurant_id' => $this->restaurant_id,

        ];
    }
}
