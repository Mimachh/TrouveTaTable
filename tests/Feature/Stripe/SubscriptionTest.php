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

    $product = Product::factory(1)->sequence(
        [
            "name" => "Offre pro",
            "price" => json_encode([
                "monthly" => 29.90,
                "annually" => 25.90
            ]),
            "order" => 1,
            "stripe_product_id" => [
                "monthly" => "price_1P3Lj9E5Smsl5TIMCzfsUIXQ",
                "annually" => "price_1P3MPvE5Smsl5TIMpVY1pCw4"
            ],
            "description" => json_encode([
                '5 products',
                'Up to 1,000 subscribers',
                'Basic analytics',
                '48-hour support response time'
            ]),

            "basic_daily_email_limit_devis" => 50
        ],

    )->create();

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
