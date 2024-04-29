<?php

use App\Actions\CreateRestaurantJWT;
use App\Actions\DecodeJWT;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Reservation\CreateController as ReservationCreateController;
use App\Http\Controllers\Reservation\StoreController as ReservationStoreController;
use App\Http\Controllers\Subscribe\CancelSubscriptionController;
use App\Http\Controllers\Subscribe\CreateController;
use App\Http\Controllers\Subscribe\StoreController;
use App\Models\Restaurant;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('guest')->get('/compte-supprime', function () {
    return Inertia::render('Bye', [
        'canGoHome' => Route::has('home'),
    ]);
});

Route::get('/', function () {

    $restaurant = Restaurant::first();
    // $jwt = (new CreateRestaurantJWT)->handle($restaurant);
    // $decode = (new DecodeJWT)->handle($jwt['jwt']);
    // return [$jwt, $decode];

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'restaurant' => $restaurant,
    ]);
})->name('home');


Route::get('/user/invoice/{invoice}', function (string $invoiceId) {
    return auth()->user()->downloadInvoice($invoiceId, [
        'street' => '4 rue du Fourneau',
        'location' => '72220, Laigné en Belin',
        'phone' => '+33 06 79 29 68 89',
        'email' => 'mimach.dev@gmail.com',
    ]);
})->name('invoice');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::middleware('redirect.subscribed')->group(function () {
        Route::prefix('subscribe')->as('subscribe.')->group(function () {
            Route::get('/{product}', CreateController::class)->name('create');
            Route::post('store', StoreController::class)->name('store');
            Route::delete('cancel', CancelSubscriptionController::class)->name('cancel')->withoutMiddleware('redirect.subscribed');
        });
    });

    Route::middleware('redirect.notsubscribed')->group(function () {
    });
});



Route::get('/reservation/{id}', ReservationCreateController::class)->name('reservation');
Route::post('/reservation/step-one', [ReservationStoreController::class, 'stepOne'])->name('reservation.step-one');
Route::post('/reservation/step-two', [ReservationStoreController::class, 'stepTwo'])->name('reservation.step-two');
Route::post('/reservation/step-three', [ReservationStoreController::class, 'stepThree'])->name('reservation.step-three');
Route::post('/reservation/step-four', [ReservationStoreController::class, 'stepFour'])->name('reservation.step-four');

require __DIR__ . '/auth.php';
