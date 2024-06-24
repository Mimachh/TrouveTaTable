<?php

namespace App\Console\Commands;

use App\Actions\Crons\CheckUserSubscription;
use Illuminate\Console\Command;

class CheckSubscriptionJob extends Command
{
    protected $signature = 'app:check-subscription-job';

    protected $description = 'This job is used to check if the subscription is still active. If not, it will send an email to the user. And deactivate the restaurant\'s services.';


    public function handle()
    {
        (new CheckUserSubscription())->handle();
        // send email
    }
}
