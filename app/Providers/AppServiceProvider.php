<?php

namespace App\Providers;

use App\Inertia\InertiaHttpGateway;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Inertia\Ssr\HttpGateway;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Inertia::share([ 'errors' => function () { return Session::get('errors') ? Session::get('errors')->getBag('default')->getMessages() : (object) []; }]);
       
    }

    public $bindings = [
        HttpGateway::class => InertiaHttpGateway::class,
    ]; 
}
