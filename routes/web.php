<?php

use App\Http\Controllers\Api\Reservation\ShowByServiceAndDateController;
use App\Http\Controllers\Api\Reservation\ShowReservationController;
use App\Http\Controllers\Api\Restaurant\GetAllMyRestaurants;
use App\Http\Controllers\Changelog\IndexChangelogController;
use App\Http\Controllers\Dashboard\GetReservationCountByDate;
use App\Http\Controllers\Dashboard\GetStatsController;
use App\Http\Controllers\Dashboard\Hours\CreateHoursController;
use App\Http\Controllers\Dashboard\Hours\IndexHoursController;
use App\Http\Controllers\Dashboard\Messages\EnableOrDisableRestaurantContactController;
use App\Http\Controllers\Dashboard\Messages\IndexMessagesController;
use App\Http\Controllers\Dashboard\Messages\ShowMessageController;
use App\Http\Controllers\Dashboard\Newsletter\IndexUserController;
use App\Http\Controllers\Dashboard\Newsletter\UnsubscribeUserController;
use App\Http\Controllers\Dashboard\Page\EnablePageController;
use App\Http\Controllers\Dashboard\Page\IndexPageController;
use App\Http\Controllers\Dashboard\Rating\IndexRatingController;
use App\Http\Controllers\Dashboard\Rating\UpdateRatingStatusClientFormController;
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
use App\Http\Controllers\Dashboard\Settings\ChangeRestaurantStatusController;
use App\Http\Controllers\Dashboard\Settings\IndexSettingsController;
use App\Http\Controllers\Dashboard\Settings\Notification\IndexRestaurantNotificationController;
use App\Http\Controllers\Dashboard\Settings\Notification\UpdateNotifyClientAfterBookingStatusController;
use App\Http\Controllers\Dashboard\Settings\Notification\UpdateNotifyClientDayBeforeBookingStatusController;
use App\Http\Controllers\Dashboard\Settings\Notification\UpdateNotifyRestaurantAfterBookingStatusController;
use App\Http\Controllers\Dashboard\Settings\Notification\UpdateNotifyRestaurantMessageStatusController;
use App\Http\Controllers\Dashboard\Settings\UpdateSettingsController;
use App\Http\Controllers\Dashboard\Tables\CreateTableController;
use App\Http\Controllers\Dashboard\Tables\DeleteTableController;
use App\Http\Controllers\Dashboard\Tables\IndexTableController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Newsletter\SubscribeToNewsletterController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\Profile\BillingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\Contact\IndexRestaurantContactController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Public\Rating\CreateRatingController;
use App\Http\Controllers\Public\Rating\CreateTokenController;
use App\Http\Controllers\Public\Rating\IndexRatingFormController;
use App\Http\Controllers\Reservation\CreateController as ReservationCreateController;
use App\Http\Controllers\Reservation\StoreController as ReservationStoreController;
use App\Http\Controllers\Restaurant\CreateRestaurantController;
use App\Http\Controllers\SendMessageToRestaurantController;
use App\Http\Controllers\Subscribe\CancelSubscriptionController;
use App\Http\Controllers\Subscribe\CreateController;
use App\Http\Controllers\Subscribe\Modal\CreateController as ModalCreateController;
use App\Http\Controllers\Subscribe\StoreController;
use App\Http\Controllers\Support\CreateSupportController;
use App\Http\Controllers\Welcome\AppNewsletterController;
use App\Http\Controllers\Welcome\CreateContactController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('guest')->get('/compte-supprime', function () {
    return Inertia::render('Bye', [
        'canGoHome' => Route::has('home'),
    ]);
})->name('account.deleted');



Route::get('/', WelcomeController::class)->name('home');
Route::get('/prices', PricingController::class)->name('prices');
Route::get('/changelog', IndexChangelogController::class)->name('changelog');
Route::post('/newsletter', AppNewsletterController::class)->name('newsletter.app.subscribe');
Route::post('/contact', CreateContactController::class)->name('contact.create');


Route::get('/user/invoice/{invoice}', function (string $invoiceId) {
    return auth()->user()->downloadInvoice($invoiceId, [
        'street' => '4 rue du Fourneau',
        'location' => '72220, Laigné en Belin',
        'phone' => '+33 06 79 29 68 89',
        'email' => 'mimach.dev@gmail.com',
    ]);
})->name('invoice');

Route::middleware(['auth'])->group(function () {

    Route::prefix('profile')->as('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('billings')->as('billings.')->group(function () {
        Route::get('/', [BillingController::class, 'edit'])->name('edit');
        Route::delete('/payment-method/{paymentMethod}', [BillingController::class, 'deletePaymentMethod'])->name('payment-method.delete');
        Route::put('/payment-method/{paymentMethod}', [BillingController::class, 'updatePaymentMethod'])->name('payment-method.update');
        Route::post('/store/new-payment-method', [BillingController::class, 'storeNewPaymentMethod'])->name('payment-method.create-new');
    });


    Route::middleware('must.have.restaurant')->group(function () {

        // Ajouter un middleware pour vérifier si le restaurant est à l'utilisateur ou si l'utilisateur est admin
        Route::prefix('dashboard')->group(function () {
            Route::get('{restaurant?}', DashboardController::class)->name('dashboard');

            Route::middleware('abort.not.my.restaurant')->prefix('{restaurant}')->as('dashboard.')->group(function () {

                // Restaurant hours
                Route::prefix('hours')->as('hours.')->group(function () {
                    Route::get('', IndexHoursController::class)->name('index');
                    Route::post('', [CreateHoursController::class, 'store'])->name('store'); // TESTED
                    Route::put('/storeTamponDuration', [CreateHoursController::class, 'storeTamponDuration'])->name('store.tampon.duration'); // TESTED
                    Route::put('/storeEndReservation', [CreateHoursController::class, 'storeEndReservation'])->name('store.end.reservation'); // TESTED
                });

                Route::prefix('reservation')->as('reservation.')->group(function () {
                    Route::get('', IndexReservationController::class)->name('index');

                    // API
                    Route::get('getReservationsByDate/{date}', ShowByServiceAndDateController::class)->name('get.by.date');
                    Route::put('/status', EnableOrDisableRestaurantReservationController::class)->name('status'); // TESTED
                });

                Route::prefix('tables')->as('tables.')->group(function () {
                    Route::get('/', IndexTableController::class)->name('index');
                    Route::post('/', CreateTableController::class)->name('store');
                    Route::delete('/{table}', DeleteTableController::class)->name('delete');
                });

                Route::prefix('messages')->as('messages.')->group(function () {
                    Route::get('/', IndexMessagesController::class)->name('index');
                    Route::put('/status', EnableOrDisableRestaurantContactController::class)->name('status'); // TESTED
                });

                Route::prefix('page')->as('page.')->group(function () {
                    Route::get('/', IndexPageController::class)->name('index');
                    Route::put('/enablePage', EnablePageController::class)->name('enable');  // TESTED
                });

                Route::prefix('newsletter')->as('newsletter.')->group(function () {
                    Route::get('/', IndexUserController::class)->name('index');
                    Route::post('/', UnsubscribeUserController::class)->name('unsubcribe');
                });

                Route::prefix('ratings')->as('ratings.')->group(function () {
                    Route::get('/', IndexRatingController::class)->name('index');
                    Route::put('/status', UpdateRatingStatusClientFormController::class)->name('status'); // TESTED
                });

                Route::prefix('settings')->as('settings.')->group(function () {
                    Route::get('/', IndexSettingsController::class)->name('index');
                    Route::put('/', UpdateSettingsController::class)->name('update'); // TESTED
                    Route::put('/change-status', ChangeRestaurantStatusController::class)->name('change-status'); // TESTED


                    Route::prefix('notifications')->as('notifications.')->group(function () {
                        Route::get('/', IndexRestaurantNotificationController::class)->name('index');
                        Route::put('/update-after-booking-restaurant', UpdateNotifyRestaurantAfterBookingStatusController::class)->name('notify-after-booking-restaurant'); // TESTED
                        Route::put('/update-after-booking-client', UpdateNotifyClientAfterBookingStatusController::class)->name('notify-after-booking-client'); // TESTED
                        Route::put('/update-day-before-booking-client', UpdateNotifyClientDayBeforeBookingStatusController::class)->name('notify-day-before-booking-client'); // TESTED
                        Route::put('/update-after-message-restaurant', UpdateNotifyRestaurantMessageStatusController::class)->name("notify-after-message-restaurant"); // TESTED
                    });
                });

                Route::prefix('avatar')->as('avatar.')->group(function () {
                    Route::post('/', UpdateAvatarRestaurantController::class)->name('update'); // TESTED
                    Route::delete('/', DeleteAvatarRestaurantController::class)->name('delete'); // TESTED
                });

                Route::prefix('media')->as('media.')->group(function () {
                    Route::post('/', UpdateMediaRestaurantController::class)->name('update'); // TESTED
                    Route::delete('/', DeleteMediaRestaurantController::class)->name('delete'); // TESTED
                });

                Route::prefix('banner')->as('banner.')->group(function () {
                    Route::post('/', UpdateBannerRestaurantController::class)->name('update'); // TESTED
                    Route::delete('/', DeleteBannerRestaurantController::class)->name('delete'); // TESTED
                });

                Route::get('/stats', GetStatsController::class)->name('stats');
                Route::get('getReservationCountByDate/{date}', GetReservationCountByDate::class)->name('get.reservation.count.by.date');
            });
        });


        // API LIKE USED BY AXIOS
        Route::get('/getAllMyRestaurants', GetAllMyRestaurants::class)->name('get.my.restaurants');


        Route::middleware('abort.not.my.restaurant')->group(function () {
            Route::get('/{restaurant}/getHoursByDayId/{day}', [CreateHoursController::class, 'getHoursByDayId'])->name('get.hours.by.day');
            Route::get('/{restaurant}/reservation/{reservation}', ShowReservationController::class)->name('show');
            Route::post('/{restaurant}/reservation/changeStatus/{reservation}', ChangeReservationStatusController::class)->name('reservation.change.status'); // TESTED
            Route::post('/{restaurant}/reservation/create/stepOne', [CreateReservationController::class, "getTables"])->name('reservation.create.stepOne'); // TESTED
            Route::post('/{restaurant}/reservation/create/stepTwo', [CreateReservationController::class, "steptwo"])->name('reservation.create.stepTwo'); // TESTED
            Route::post('/{restaurant}/reservation/create/stepThree', [CreateReservationController::class, "stepthree"])->name('reservation.create.stepThree'); // TESTED
            Route::get('/{restaurant}/message/{message}', ShowMessageController::class)->name('message.show');
        });
    });

    Route::post('/support', CreateSupportController::class)->name("support.send"); // TESTED

    Route::prefix('restaurant')->as('restaurant.')->group(function () {
        Route::post('store', [CreateRestaurantController::class, 'store'])->name('store'); // TESTED
        Route::get('create', function () {
            return Inertia::render('Restaurant/Create/CreateRestaurant', [
                'canGoHome' => Route::has('home'),
            ]);
        })->name('create');
    });




    // Route::middleware(['redirect.subscribed'])->group(function () {
    //     Route::prefix('subscribe')->as('subscribe.')->group(function () {
    //         Route::get('/{product}', CreateController::class)->name('create');
    //         Route::post('store', StoreController::class)->name('store');
    //         Route::delete('cancel', CancelSubscriptionController::class)->name('cancel')->withoutMiddleware('redirect.subscribed');

    //         Route::get('modal/{product}', ModalCreateController::class)->name('modal.create');
    //     });
    // });

    Route::middleware('redirect.notsubscribed')->group(function () {
    });
});

Route::middleware(["auth"])->group(function () {
    Route::prefix('subscribe')->as('subscribe.')->group(function () {
        Route::get('/{product}', CreateController::class)->name('create');
        Route::post('store', StoreController::class)->name('store');
        Route::delete('cancel', CancelSubscriptionController::class)->name('cancel')
            // ->withoutMiddleware('redirect.subscribed')
        ;

        Route::get('modal/{product}', ModalCreateController::class)->name('modal.create');
    });
});

Route::prefix('book')->group(function () {
    Route::get('{id}', ReservationCreateController::class)->name('reservation');
    Route::post('step-one', [ReservationStoreController::class, 'stepOne'])->name('reservation.step-one');
    Route::post('step-two/{restaurant}', [ReservationStoreController::class, 'stepTwo'])->name('reservation.step-two');
    Route::post('step-three/{restaurant}', [ReservationStoreController::class, 'stepThree'])->name('reservation.step-three');
    Route::post('step-four/{restaurant}', [ReservationStoreController::class, 'stepFour'])->name('reservation.step-four');
});

Route::prefix('rating')->as('rating.')->group(function () {
    Route::get('/', IndexRatingFormController::class)->name('index');
    Route::post('/', CreateRatingController::class)->name('store');
    Route::get('/createToken', CreateTokenController::class)->name('createToken');
});


Route::get('/restaurant/{slug}', PageController::class)->name('restaurant');
Route::get('/restaurant/{slug}/contact', IndexRestaurantContactController::class)->name('restaurant.contact.get');



Route::post('/send-message-to-restaurant', SendMessageToRestaurantController::class)->name('message.send'); // TESTED
Route::post('/subscribe-to-newsletter-restaurant/{restaurant}', SubscribeToNewsletterController::class)->name('newsletter.subscribe');



Route::get('forbidden', function () {
    return Inertia::render('Error403');
})->name('forbidden');

Route::get('restaurant/notFound', function () {
    return Inertia::render('Public/Restaurant/PageNotAvailable');
})->name('restaurant.notFound');

// Route::get('mail', function () {
//     return view('mails.reservation.status-change');
// });

// Route::get('/mail', function () {

//     $reservation = Reservation::where('id', 1)->first();


//     return new App\Mail\Reservation\RemindBookingMail(
//         $reservation,
//     );
// });
// Route::get('/rating-mail', function () {

//     $ratingRestaurant = new RatingRestaurantResource(RatingRestaurant::find(1));
//     $restaurant = Restaurant::first();


//     return new App\Mail\Rating\NewRatingNotifyRestaurant(
//         $restaurant,
//         $ratingRestaurant
//     );
// });


// Route::post('/buy', function () {
//      {/* <form action={route("credit.buy")}
//                             method="POST"
//                             className="w-full"
//                             >
//                                 <input
//                                     type="hidden"
//                                     name="_token"
//                                     value={csrf_token as string}
//                                 />
//                                 <Button className="w-full">Get started</Button>
//                             </form> */}
//     $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
//     $product = Product::first();


//         // $stripeProductIds = json_decode($product->stripe_product_id, true);


//         $price = json_decode($product->price, true);

//         // $stripeProductId = $stripeProductIds['monthly'];
//     $checkout_session = $stripe->checkout->sessions->create([
//         'line_items' => [
//             [
//                 'price' => $product->stripe_product_id['monthly'],
//                 'quantity' => 1,
//             ],
//         ],
//         'mode' => 'subscription',
//         'success_url' => route('home', [], true),
//         'cancel_url' => route('home', [], true),
//     ]);
//     return redirect($checkout_session->url);
// })->name('credit.buy');


require __DIR__ . '/auth.php';
