<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not activate booking form if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'accept_reservations' => false
    ]);

    $response = put(route('dashboard.reservation.status', ['restaurant' => $restaurant->id]), [
        'accept_reservations' => true,
    ])->assertRedirect(route('login'));

});

it('can not activate booking form if no restaurant', function () {
    $restaurant = Restaurant::factory()->create([
        'accept_reservations' => false
    ]);

    $user = User::factory()->create();
    $response = $this->actingAs($user)->put(route('dashboard.reservation.status', ['restaurant' => $restaurant->id]), [
        'accept_reservations' => true,
    ])->assertRedirect(route('restaurant.create'));
    assertDatabaseHas('restaurants', [
        'accept_reservations' => false,
    ]);
});

it('can not activate booking form if not his', function () {
    $restaurant = Restaurant::factory()->create([
        'accept_reservations' => false
    ]);

    $user = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'accept_reservations' => false,
        "owner_id" => $user->id
    ]); 
    $response = $this->actingAs($user)->put(route('dashboard.reservation.status', ['restaurant' => $restaurant->id]), [
        'accept_reservations' => true,
    ])->assertStatus(403);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => false,
    ]);
});

it('can not activate booking form if not fondator', function () {
    $user = User::factory()->create();

   $restaurant = Restaurant::factory()->create([
        'accept_reservations' => false,
        "owner_id" => $user->id
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.reservation.status', ['restaurant' => $restaurant->id]), [
        'accept_reservations' => true,
    ])->assertStatus(403);
    
    assertDatabaseHas('restaurants', [
        'accept_reservations' => false,
    ]);
});

it('can activate message contact if fondator', function () {
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
    
    $user = User::factory()->create();

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
        'accept_reservations' => false,
        "owner_id" => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.reservation.status', ['restaurant' => $restaurant->id]), [
        'accept_reservations' => true,
    ])->assertStatus(201);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => true,
    ]);

});