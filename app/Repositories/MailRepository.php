<?php

namespace App\Repositories;

use App\Models\Restaurant;

class MailRepository
{
    public RestaurantRepository $restaurantRepository;
    public function __construct() {
        $this->restaurantRepository = new RestaurantRepository();
    }

    public function isRestaurantCanSendReservationMail(Restaurant $restaurant): bool
    {
        return $this->canSendMail($restaurant) && $restaurant->is_notify_client_after_booking;
    }

    public function isRestaurantCanSendRatingMail(Restaurant $restaurant): bool
    {
        return $this->canSendMail($restaurant) && $restaurant->accept_rating;
    }

    public function isRetaurantCanSendRappelMail() {

    }

    public function canSendMail(Restaurant $restaurant): bool {
        $isMissingInfo = $this->restaurantRepository->isRestaurantMissingInformation($restaurant);
        return !$isMissingInfo && $restaurant->active;
    }
}