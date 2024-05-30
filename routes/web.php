<?php

use App\Actions\CreateRestaurantJWT;
use App\Actions\DecodeJWT;
use App\Http\Controllers\Api\Reservation\ShowByServiceAndDateController;
use App\Http\Controllers\Api\Reservation\ShowReservationController;
use App\Http\Controllers\Api\Restaurant\GetAllMyRestaurants;
use App\Http\Controllers\Dashboard\Hours\CreateHoursController;
use App\Http\Controllers\Dashboard\Hours\IndexHoursController;
use App\Http\Controllers\Dashboard\Messages\EnableOrDisableRestaurantContactController;
use App\Http\Controllers\Dashboard\Messages\IndexMessagesController;
use App\Http\Controllers\Dashboard\Messages\ShowMessageController;
use App\Http\Controllers\Dashboard\Newsletter\IndexUserController;
use App\Http\Controllers\Dashboard\Newsletter\UnsubscribeUserController;
use App\Http\Controllers\Dashboard\Page\EnablePageController;
use App\Http\Controllers\Dashboard\Page\IndexPageController;
use App\Http\Controllers\Dashboard\Reservation\ChangeReservationStatusController;
use App\Http\Controllers\Dashboard\Reservation\CreateReservationController;
use App\Http\Controllers\Dashboard\Reservation\EnableOrDisableRestaurantReservationController;
use App\Http\Controllers\Dashboard\Reservation\IndexReservationController;
use App\Http\Controllers\Dashboard\Restaurant\DeleteAvatarRestaurantController;
use App\Http\Controllers\Dashboard\Restaurant\DeleteBannerRestaurantController;
use App\Http\Controllers\Dashboard\Restaurant\DeleteMediaRestaurantController;
use App\Http\Controllers\Dashboard\Restaurant\UpdateAvatarRestaurantController;
use App\Http\Controllers\Dashboard\Restaurant\UpdateBannerRestaurantController;
use App\Http\Controllers\Dashboard\Restaurant\UpdateMediaRestaurantController;
use App\Http\Controllers\Dashboard\Tables\CreateTableController;
use App\Http\Controllers\Dashboard\Tables\DeleteTableController;
use App\Http\Controllers\Dashboard\Tables\IndexTableController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Newsletter\SubscribeToNewsletterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Reservation\CreateController as ReservationCreateController;
use App\Http\Controllers\Reservation\StoreController as ReservationStoreController;
use App\Http\Controllers\Restaurant\CreateRestaurantController;
use App\Http\Controllers\SendMessageToRestaurantController;
use App\Http\Controllers\Subscribe\CancelSubscriptionController;
use App\Http\Controllers\Subscribe\CreateController;
use App\Http\Controllers\Subscribe\StoreController;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Reservation;
use App\Models\Restaurant;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('guest')->get('/compte-supprime', function () {
    return Inertia::render('Bye', [
        'canGoHome' => Route::has('home'),
    ]);
})->name('account.deleted');



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

    Route::middleware('must.have.restaurant')->group(function () {

        // Ajouter un middleware pour vérifier si le restaurant est à l'utilisateur ou si l'utilisateur est admin
        Route::prefix('dashboard')->group(function () {
            Route::get('{restaurant?}', DashboardController::class)->name('dashboard');

            Route::middleware('abort.not.my.restaurant')->prefix('{restaurant}')->as('dashboard.')->group(function () {

                // Restaurant hours
                Route::prefix('hours')->as('hours.')->group(function () {
                    Route::get('', IndexHoursController::class)->name('index');
                    Route::post('', [CreateHoursController::class, 'store'])->name('store');
                    Route::put('/storeTamponDuration', [CreateHoursController::class, 'storeTamponDuration'])->name('store.tampon.duration');
                    Route::put('/storeEndReservation', [CreateHoursController::class, 'storeEndReservation'])->name('store.end.reservation');
                });

                Route::prefix('reservation')->as('reservation.')->group(function () {
                    Route::get('', IndexReservationController::class)->name('index');

                    // API
                    Route::get('getReservationsByDate/{date}', ShowByServiceAndDateController::class)->name('get.by.date');
                    Route::put('/status', EnableOrDisableRestaurantReservationController::class)->name('status'); 
                });

                Route::prefix('tables')->as('tables.')->group(function () {
                    Route::get('/', IndexTableController::class)->name('index');
                    Route::post('/', CreateTableController::class)->name('store');
                    Route::delete('/{table}', DeleteTableController::class)->name('delete');
                });

                Route::prefix('messages')->as('messages.')->group(function () {
                    Route::get('/', IndexMessagesController::class)->name('index');

                    Route::put('/status', EnableOrDisableRestaurantContactController::class)->name('status');
                  
                });

                Route::prefix('page')->as('page.')->group(function () {
                    Route::get('/', IndexPageController::class)->name('index');

                    Route::put('/enablePage', EnablePageController::class)->name('enable');
                });

                Route::prefix('newsletter')->as('newsletter.')->group(function () {
                    Route::get('/', IndexUserController::class)->name('index');
                    Route::post('/', UnsubscribeUserController::class)->name('unsubcribe');
                });


                Route::prefix('avatar')->as('avatar.')->group(function () {
                    Route::post('/', UpdateAvatarRestaurantController::class)->name('update');
                    Route::delete('/', DeleteAvatarRestaurantController::class)->name('delete');
                });

                Route::prefix('media')->as('media.')->group(function () {
                    Route::post('/', UpdateMediaRestaurantController::class)->name('update');
                    Route::delete('/', DeleteMediaRestaurantController::class)->name('delete');
                });

                Route::prefix('banner')->as('banner.')->group(function () {
                    Route::post('/', UpdateBannerRestaurantController::class)->name('update');
                    Route::delete('/', DeleteBannerRestaurantController::class)->name('delete');
                });
              
            });
        });


        // API LIKE USED BY AXIOS
        // Every route here must have policy to check if the restaurant is owned by the user
            Route::get('/getAllMyRestaurants', GetAllMyRestaurants::class)->name('get.my.restaurants');
            

            Route::middleware('abort.not.my.restaurant')->group(function () {
                Route::get('/{restaurant}/getHoursByDayId/{day}', [CreateHoursController::class, 'getHoursByDayId'])->name('get.hours.by.day');
                Route::get('/{restaurant}/reservation/{reservation}', ShowReservationController::class)->name('show');
                Route::post('/{restaurant}/reservation/changeStatus/{reservation}', ChangeReservationStatusController::class)->name('reservation.change.status');
                Route::post('/{restaurant}/reservation/create/stepOne', [CreateReservationController::class, "getTables"])->name('reservation.create.stepOne');
                Route::post('/{restaurant}/reservation/create/stepTwo', [CreateReservationController::class, "steptwo"])->name('reservation.create.stepTwo');
                Route::post('/{restaurant}/reservation/create/stepThree', [CreateReservationController::class, "stepthree"])->name('reservation.create.stepThree');

                Route::get('/{restaurant}/message/{message}', ShowMessageController::class)->name('message.show');

               
            });
    });


    Route::prefix('restaurant')->as('restaurant.')->group(function () {
        Route::post('store', [CreateRestaurantController::class, 'store'])->name('store');
        
        Route::get('create', function () {
            return Inertia::render('Restaurant/Create/CreateRestaurant', [
                'canGoHome' => Route::has('home'),
            ]);
        })->name('create');
    });



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


Route::prefix('book')->group(function () {
    Route::get('{id}', ReservationCreateController::class)->name('reservation');
    Route::post('step-one', [ReservationStoreController::class, 'stepOne'])->name('reservation.step-one');
    Route::post('step-two/{restaurant}', [ReservationStoreController::class, 'stepTwo'])->name('reservation.step-two');
    Route::post('step-three/{restaurant}', [ReservationStoreController::class, 'stepThree'])->name('reservation.step-three');
    Route::post('step-four/{restaurant}', [ReservationStoreController::class, 'stepFour'])->name('reservation.step-four');
});

Route::get('/restaurant/{slug}', PageController::class)->name('restaurant');
// Route::get('/book/{id}', ReservationCreateController::class)->name('reservation');
// Route::post('/book/step-one', [ReservationStoreController::class, 'stepOne'])->name('reservation.step-one');
// Route::post('/book/step-two', [ReservationStoreController::class, 'stepTwo'])->name('reservation.step-two');
// Route::post('/book/step-three', [ReservationStoreController::class, 'stepThree'])->name('reservation.step-three');
// Route::post('/book/step-four', [ReservationStoreController::class, 'stepFour'])->name('reservation.step-four');

Route::post('/send-message-to-restaurant', SendMessageToRestaurantController::class)->name('message.send');
Route::post('/subscribe-to-newsletter-restaurant/{restaurant}', SubscribeToNewsletterController::class)->name('newsletter.subscribe');

Route::get('forbidden', function () {
    return Inertia::render('Error403');
})->name('forbidden');

Route::get('restaurant/notFound', function () {
    return Inertia::render('Public/Restaurant/PageNotAvailable');
})->name('restaurant.notFound');

Route::get('mail', function () {
    return view('mails.reservation.status-change');
});

Route::get('/mail', function () {

    $reservationResource = new ReservationResource(Reservation::find(1));
    $reservation = Reservation::where('id', 1)->first();


    $restaurant = new RestaurantResource($reservation->table->restaurant);

    return new App\Mail\Reservation\ChangeStatusMail(
        $restaurant,
        $reservation,
        'refusé',
        "sujet",
        "Malheuresement le restaurant sera fermé demain."
    );
});



require __DIR__ . '/auth.php';
