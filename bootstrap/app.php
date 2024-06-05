<?php

use App\Http\Middleware\RedirectIfSubscribed;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        channels: __DIR__ . '/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \Illuminate\Session\Middleware\StartSession::class,
        ]);
        $middleware->alias([
            'redirect.subscribed' => RedirectIfSubscribed::class,
            'redirect.notsubscribed' => \App\Http\Middleware\RedirectIfNotSubscribed::class,
            'must.have.restaurant' => \App\Http\Middleware\MustHaveRestaurant::class,
            'abort.not.my.restaurant' => \App\Http\Middleware\AbortIfNotMyRestaurant::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'stripe/*',
            '/buy-credits/webhook'
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('queue:work --stop-when-empty')
            ->everyMinute()
            ->withoutOverlapping();
            
        $schedule->command('backup:run')
            ->hourly()
            ->withoutOverlapping();

         $schedule->command('app:send-mail-after-reservation-job')
            ->dailyAt('08:00')
            ->withoutOverlapping();

    })->create();
    // php artisan schedule:list