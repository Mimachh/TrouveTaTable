<?php

namespace App\Console\Commands;

use App\Actions\Ratings\GenerateRatingMail;
use Illuminate\Console\Command;

class SendMailAfterReservationJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-mail-after-reservation-job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get all reservations from yesterday and send mail to clients to rate the restaurant.';

 
    public function handle()
    {
       (new GenerateRatingMail())->handle();
    }
}
