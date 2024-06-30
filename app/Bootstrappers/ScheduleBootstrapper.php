<?php

namespace App\Bootstrappers;

use Illuminate\Console\Scheduling\Schedule;

class ScheduleBootstrapper
{    
    // php artisan schedule:list
    public function __invoke(Schedule $schedule): void
    {
        // $schedule->command('queue:work --stop-when-empty')
        //     ->everyMinute()
        //     ->withoutOverlapping();

        // $schedule->command('backup:run')
        //     ->hourly()
        //     ->withoutOverlapping();

        $schedule->command('app:send-mail-after-reservation-job')
            ->dailyAt('08:00')
            ->withoutOverlapping();


        $schedule->command('app:booking-reminder-job')
            ->dailyAt('17:00')
            ->withoutOverlapping();

        $schedule->command('app:generate-sitemap')
            ->dailyAt('23:00')
            ->withoutOverlapping();

        $schedule->command('app:check-subscription-job')
            ->dailyAt('00:00')
            ->withoutOverlapping();
    }
}
