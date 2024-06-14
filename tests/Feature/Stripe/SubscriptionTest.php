<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;

it('can subscribe', function () {
    $stripe = new StripeClient(config('stripe.stripe_secret'));

    $user = User::factory()->create();

    $product =     Product::factory()->create([
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

    $firstProduct = $product->first();

    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);


    $t = actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));
    // ->assertRedirect('/dashboard');
    assertDatabaseCount('subscriptions', 1);
});
