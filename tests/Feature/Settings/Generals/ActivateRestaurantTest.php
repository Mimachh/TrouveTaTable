<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not activate restaurant if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'active' => false
    ]);

    $response = put(route('dashboard.settings.change-status', ['restaurant' => $restaurant->id]), [
        'active' => true,
    ])->assertRedirect(route('login'));

});

it('can not activate restaurant if not his', function () {
    $restaurant = Restaurant::factory()->create([
        'active' => false
    ]);

    $user = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'active' => false,
        "owner_id" => $user->id
    ]); 
    $response = $this->actingAs($user)->put(route('dashboard.settings.change-status', ['restaurant' => $restaurant->id]), [
        'active' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'active' => false,
    ]);
    $response->assertStatus(403);
});

it('can not activate restaurant if not fondator', function () {
    $user = User::factory()->create();
    //     ->post(route('subscribe.store', [
    //         'paymentMethod' => $paymentIntent->payment_method,
    //         'selectedProductId' => $product->id,
    //         'recurrence' => 'monthly'
    //     ]));


    
    $restaurant = Restaurant::factory()->create([
        'active' => false,
        "owner_id" => $user->id
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.settings.change-status', ['restaurant' => $restaurant->id]), [
        'active' => true,
    ])->assertStatus(403);
    assertDatabaseHas('restaurants', [
        'active' => false,
    ]);
});

it('can activate restaurant if fondator', function () {
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
        'active' => false,
        "owner_id" => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.settings.change-status', ['restaurant' => $restaurant->id]), [
        'active' => true,
    ])->assertStatus(201);
    assertDatabaseHas('restaurants', [
        'active' => true,
    ]);

});