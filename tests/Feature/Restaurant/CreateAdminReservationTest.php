<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\Table;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;


it('can not perform first step if not fondator', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);

    $response = $this->actingAs($user)->post(route('reservation.create.stepOne', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
    ])->assertSessionHasNoErrors();
    $response->assertStatus(403);
});

it('can perform first step if fondator', function () {
    $user = User::factory()->create();

    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);



    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);


    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));


    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepOne', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
        'service_id' => $service->id
    ])->assertSessionHasNoErrors();
    $response->assertStatus(200);
});

it('can not perform step two if not fondator', function () {
    $user = User::factory()->create();

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);

    $response = $this->actingAs($user)->post(route('reservation.create.stepTwo', $restaurant), [
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '09:00:00'
    ])->assertStatus(403);

    assertDatabaseCount('reservations', 0);
});

it('can not perform step two if fondator but select hours is not in range', function () {
    $user = User::factory()->create();
    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);

    $response = $this->actingAs($user)->post(route('reservation.create.stepTwo', $restaurant), [
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '09:00:00'
    ])->assertSessionHasErrors("time");
});

it('can perform step two if fondator', function () {
    $user = User::factory()->create();
    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);
    $table = Table::factory()->create([
        'restaurant_id' => $restaurant->id,
        'seats' => 1
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepTwo', $restaurant), [
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '11:00:00'
    ])->assertSessionHasNoErrors();

    $response->assertJson([
        'message' => 'ok'
    ]);
});

it('can not perform step three if not fondator', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);
    $table = Table::factory()->create([
        'restaurant_id' => $restaurant->id,
        'seats' => 1
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepThree', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
        'service_id' => $service->id,
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '11:00:00',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606'
    ])->assertStatus(403);
});

it('can not perform step three if fondator', function () {
    $user = User::factory()->create();

    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);
    $table = Table::factory()->create([
        'restaurant_id' => $restaurant->id,
        'seats' => 1
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepThree', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
        'service_id' => $service->id,
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '11:00:00',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606'
    ])->assertStatus(200);

    assertDatabaseHas('reservations', [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606',
        'reservation_date' => '2022-01-01',
        'time' => '11:00:00',
        'status' => 'accepté',
        'service_id' => $service->id,
        'table_id' => 1,
        'guests' => 2
    ]);
    assertDatabaseCount('reservations', 1);
});

it('can not update reservation if not owner', function () {
    $user = User::factory()->create();

    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);
    $table = Table::factory()->create([
        'restaurant_id' => $restaurant->id,
        'seats' => 1
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepThree', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
        'service_id' => $service->id,
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '11:00:00',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606'
    ])->assertStatus(200);

    assertDatabaseHas('reservations', [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606',
        'reservation_date' => '2022-01-01',
        'time' => '11:00:00',
        'status' => 'accepté',
        'service_id' => $service->id,
        'table_id' => 1,
        'guests' => 2
    ]);
    assertDatabaseCount('reservations', 1);

    $reservation = $restaurant->reservations()->first();

    $user2 = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'owner_id' => $user2->id,
        'name' => 'Restaurant 2',
    ]);
    // {restaurant}/reservation/changeStatus/{reservation}
    $response2 = $this->actingAs($user2)->post(route('reservation.change.status', [$restaurant, $reservation]), [
        "reservation_id" => $reservation->id,
        "status" => "refusé",
        "reason" => "Raison de refus"
    ])->assertStatus(403);
  
    assertDatabaseHas('reservations', [
        "status" => "accepté",
    ]);
});

it('can update reservation if owner', function () {
    $user = User::factory()->create();

    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product =   Product::factory()->create([
        "name" => "Pack Fondateur",
        "order" => 1,
        "price" => json_encode([
            "monthly" => 2500,
            "annually" => 2000
        ]),
        "stripe_product_id" => [
            "monthly" => config('stripe.status') === "test" ? "price_1PQwQSF8f3TP4aCxMmi7q7YK" : "",
            "annually" => config('stripe.status') === "test" ? "price_1PQwQ8F8f3TP4aCx20ggpfLf" : ""
        ],
        "description" => "",
        "mostPopular" => true,
        "feature" => json_encode([
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ]),
    ]);
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 2000,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $product->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
        'name' => 'Restaurant 1',
    ]);
    $service = Service::factory()->create([
        'restaurant_id' => $restaurant->id,
        "name" => "Service 1",
        "start_time" => "10:00:00",
        "end_time" => "12:00:00"
    ]);
    $table = Table::factory()->create([
        'restaurant_id' => $restaurant->id,
        'seats' => 1
    ]);
    $response = $this->actingAs($user)->post(route('reservation.create.stepThree', $restaurant), [
        'reservation_date' => '2022-01-01',
        'guests' => 2,
        'service_id' => $service->id,
        'services' => [$service->id],
        'table_id' => 1,
        'time' => '11:00:00',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606'
    ])->assertStatus(200);

    assertDatabaseHas('reservations', [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'karl.mullr@mail.com',
        'phone' => '0606060606',
        'reservation_date' => '2022-01-01',
        'time' => '11:00:00',
        'status' => 'accepté',
        'service_id' => $service->id,
        'table_id' => 1,
        'guests' => 2
    ]);
    assertDatabaseCount('reservations', 1);

    $reservation = $restaurant->reservations()->first();



    $response2 = $this->actingAs($user)->post(route('reservation.change.status', [$restaurant, $reservation]), [
        "reservation_id" => $reservation->id,
        "status" => "refusé",
        "reason" => "Raison de refus"
    ])->assertStatus(200);
  
    assertDatabaseHas('reservations', [
        "status" => "refusé",
    ]);
});