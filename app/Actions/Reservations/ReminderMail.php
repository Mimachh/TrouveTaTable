<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use App\Mail\Reservation\RemindBookingMail;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Mail;

class ReminderMail
{
    public function handle()
    {
        $restaurantCanSendReminderWithReservation = $this->getRestaurantsWithReminder();
        if(empty($restaurantCanSendReminderWithReservation)) {
            return;
        }
        $reservationTomorrow = $this->getReservationTomorrow($restaurantCanSendReminderWithReservation);
        if(empty($reservationTomorrow) && count($reservationTomorrow) === 0) {
           return;
        }
        $this->loopThrowReservationToSendMail($reservationTomorrow);
    }
    private function sendMail(Reservation $reservation)
    {
        Mail::to($reservation->email)->send(new RemindBookingMail(
            $reservation
        ));
    }
    private function loopThrowReservationToSendMail(array $reservationsTomorrow)
    {
        foreach ($reservationsTomorrow as $reservation) {
            $this->sendMail($reservation);
        }
    }

    private function getRestaurantsWithReminder()
    {
        $restaurantsEnable = Restaurant::reminderOpen()->with('reservations')->get();
        if($restaurantsEnable->isEmpty()) {
            return [];
        }
        $restaurantsArray = [];
        foreach ($restaurantsEnable as $restaurant) {
            $restaurantsArray[] = $restaurant->reservations;
        }
        return $restaurantsArray;
    }

    private function getReservationTomorrow(array $reservationsCollection)
    {
        $tomorrowReservation = [];
        if (empty($reservationsCollection)) {
            return [];
        }
        foreach ($reservationsCollection as $reservations) {

            foreach ($reservations as $reservation) {
                $reservationDate = Carbon::parse($reservation->reservation_date);
                if ($reservationDate->isTomorrow()) {
                    $tomorrowReservation[] = $reservation;
                }
            }
        }
        return $tomorrowReservation;
    }
}
