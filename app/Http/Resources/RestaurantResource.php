<?php

namespace App\Http\Resources;

use App\Repositories\RatingRepository;
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
            'slug' => $this->slug,
            'description' => $this->description,
            'address' => $this->address,
            'city' => $this->city,
            'zip' => $this->zip,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'logo' => $this->logo,
            'cover' => $this->cover,
            'active' => $this->active,
            'banner' => $this->banner,
            'avatar' => $this->avatar,
            'restaurant_link_book_form' => config('app.url') . '/book/' . $this->id,
            'restaurant_link_page' => config('app.url') . '/restaurant/' . $this->slug,
            'medias' => MediaResource::collection($this->medias),

            'accept_reservations' => $this->accept_reservations,
            'accept_messages' => $this->accept_messages,
            'enable_page' => $this->enable_page,
            
            'time_before_service' => $this->time_before_service,
            'time_after_service' => $this->time_after_service,
            'time_to_stop_reservation' => $this->time_to_stop_reservation,
            'owner_id' => $this->owner_id,
            'services' => ServiceResource::collection($this->services->sortBy('start_time')),
            // 'servicesWithOptions' => $this->whenLoaded('servicesWithOptions', function () {
            //     return ServiceWithOptionResource::collection($this->services->sortBy('start_time'), $this->id);
            // }),
            'reservations' => $this->whenLoaded('reservations', function () {
                return ReservationResource::collection($this->reservations);
            }),
            'rating' => $this->when('validNotes', function () {
                $repository = new RatingRepository();

                return [
                    'countRating' => $this->validNotes->count(),
                    'averageRating' => $repository->averageRating($this->validNotes),
                    'itemsRating' => $repository->getItemRatings($this->validNotes),
                ];
            }), 
        ];
    }
}
