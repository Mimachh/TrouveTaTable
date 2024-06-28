<?php

declare(strict_types=1);

namespace App\Actions\Reservations;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use App\Models\Restaurant;

class Stats
{
    public function handle(Restaurant $restaurant)
    {

        $reservationsOfTheMonth = Reservation::query()
            ->select('reservations.*') // Sélectionne toutes les colonnes de la table reservations
            ->where('reservations.status', ReservationStatus::ACCEPTED->value) // Assurez-vous que la colonne status est bien dans reservations
            ->join('tables as t', 'reservations.table_id', '=', 't.id') // Utilisez un alias pour la table des tables
            ->where('t.restaurant_id', $restaurant->id) // Filtre par l'ID du restaurant avec l'alias
            ->whereMonth('reservations.reservation_date', now()->month) // Filtre par le mois courant
            ->whereYear('reservations.reservation_date', now()->year) // Ajoute un filtre pour l'année courante
            ->get();

        $totalReservationOfThePreviousMonth = Reservation::query()
            ->select('reservations.*') // Sélectionne toutes les colonnes de la table reservations
            ->where('reservations.status', ReservationStatus::ACCEPTED->value) // Assurez-vous que la colonne status est bien dans reservations
            ->join('tables as t', 'reservations.table_id', '=', 't.id') // Utilisez un alias pour la table des tables
            ->where('t.restaurant_id', $restaurant->id) // Filtre par l'ID du restaurant avec l'alias
            ->whereMonth('reservations.reservation_date', now()->startOfMonth()->subMonth()) // Filtre par le mois précédent
            ->whereYear('reservations.reservation_date', now()->year) // Ajoute un filtre pour l'année courante
            ->get();


        $reservation = $this->reservationPercentage($reservationsOfTheMonth, $totalReservationOfThePreviousMonth);
        $guests = $this->guestsPercentage($reservationsOfTheMonth, $totalReservationOfThePreviousMonth);

        return [
            'reservation_percentage' => $reservation,
            'guests_percentage' => $guests,
            'reservation_month' => $reservationsOfTheMonth->count(),
            'guests_month' => $reservationsOfTheMonth->sum('guests'),
        ];
    }

    public function reservationPercentage(
        $reservationsOfTheMonth,
        $totalReservationOfThePreviousMonth
    ) {
        if ($totalReservationOfThePreviousMonth->count() === 0) {
            return 0;
        }

        return (int) (($reservationsOfTheMonth->count() - $totalReservationOfThePreviousMonth->count()) / $totalReservationOfThePreviousMonth->count() * 100);
    }

    public function guestsPercentage(
        $reservationsOfTheMonth,
        $totalReservationOfThePreviousMonth
    )
    {
        if ($totalReservationOfThePreviousMonth->sum('guests') === 0) {
            return 0;
        }

        return (int) (($reservationsOfTheMonth->sum('guests') - $totalReservationOfThePreviousMonth->sum('guests')) / $totalReservationOfThePreviousMonth->sum('guests') * 100);
    }
}
