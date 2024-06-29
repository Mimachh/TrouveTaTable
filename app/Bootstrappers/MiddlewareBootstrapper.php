<?php

namespace App\Bootstrappers;

use App\Http\Middleware\RedirectIfSubscribed;
use Illuminate\Foundation\Configuration\Middleware;

class MiddlewareBootstrapper
{

    public function __invoke(Middleware $middleware): void
    {
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
    }
}
