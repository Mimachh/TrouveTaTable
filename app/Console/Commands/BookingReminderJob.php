<?php

namespace App\Console\Commands;

use App\Actions\Reservations\ReminderMail;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Console\Command;

class BookingReminderJob extends Command
{
    protected $signature = 'app:booking-reminder-job';

    protected $description = 'This command send an email reminder to the user for their upcoming booking.';

    public function handle()
    {
        (new ReminderMail())->handle();
    }
}
