<?php

namespace App\Console\Commands;

use App\Actions\Reservations\ReminderMail;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Console\Command;

class BookingReminderJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:booking-reminder-job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command send an email reminder to the user for their upcoming booking.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // $restaurant = Restaurant::factory()->create([
        //     'is_notify_client_a_day_before_booking' => true,
        //     'active' => true,
        // ]);

        // $table = Table::factory()->create([
        //     'name' => 'Table 1',
        //     'seats' => 4,
        //     'restaurant_id' => $restaurant->id,
        // ]);

        // $service = $restaurant->services()->create([
        //     'name' => 'Service 1',
        //     'day_id' => 1,
        //     'start_time' => '09:00:00',
        //     'end_time' => '11:00:00',
        // ]);

        // $reservation = Reservation::factory()->create([
        //     'service_id' => $service->id,
        //     'table_id' => $table->id,
        //     'email' => 'karl.mulr@gmail.com',
        //     'reservation_date' => now()->addDay(),
        //     'time' => '10:00:00',
        //     'guests' => 4,

        // ]);
        // dd($reservation);
        (new ReminderMail())->handle();
    }
}
