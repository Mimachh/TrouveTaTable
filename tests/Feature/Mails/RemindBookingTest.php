<?php

declare(strict_types=1);

use App\Mail\Reservation\RemindBookingMail;
use App\Models\Day;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\Table;
use Illuminate\Support\Facades\Mail;

use function Pest\Laravel\assertDatabaseCount;

it('receive mail if book today and mail active', function () {
    $day = Day::factory()->create([
        'name' => 'Monday',
    ]);
    $restaurant = Restaurant::factory()->create([
        'is_notify_client_a_day_before_booking' => true,
        'active' => true,
    ]);

    $table = Table::factory()->create([
        'name' => 'Table 1',
        'seats' => 4,
        'restaurant_id' => $restaurant->id,
    ]);
    assertDatabaseCount('tables', 1);

    $service = Service::factory()->create([
        'name' => 'Service 1',
        'day_id' => 1,
        'start_time' => '09:00:00',
        'end_time' => '11:00:00',
        'restaurant_id' => $restaurant->id,

    ]);
    assertDatabaseCount('services', 1);

    $reservation = Reservation::factory()->create([
        'service_id' => $service->id,
        'table_id' => $table->id,
        'email' => 'karl.mulr@gmail.com',
        'reservation_date' => now()->addDay(),
        'time' => '10:00:00',
        'guests' => 4,
    ]);

    Mail::fake();

    $this->artisan('app:booking-reminder-job');
    // dd($reservation);

    Mail::assertQueued(RemindBookingMail::class, function ($mail) use ($reservation) {
        return $mail->hasTo($reservation->email);
    });
    Mail::assertQueuedCount(1);

});
