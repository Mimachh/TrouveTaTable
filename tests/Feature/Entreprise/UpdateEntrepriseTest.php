<?php

declare(strict_types=1);

use App\Models\Entreprise;
use App\Models\EntrepriseStatus;
use App\Models\Product;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;

it('can update own entreprise', function () {
    $stripe = new StripeClient(config('stripe.stripe_secret'));
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
    $user = User::factory()->create();

    $firstProduct = $product->first();

    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $user = $user->where('id', $user->id)->with('subscriptions')->first();


    $entreprise = Entreprise::factory(1)->create();

    $entreprise = $entreprise->first();
    $entreprise->user_id = $user->id;
    $entreprise->save();

    $updatedData = [
        "id" => $entreprise->id,
        "name" => "Updated Name"
    ];
    $response = $this->actingAs($user)->patch(route('entreprise.update'), $updatedData);



    $updatedEntreprise = Entreprise::find($entreprise->id);

    $this->assertEquals($updatedData['name'], $updatedEntreprise->name);
});

it('cannot update another entreprise', function () {
    $stripe = new StripeClient(config('stripe.stripe_secret'));
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
    $user = User::factory()->create();

    $firstProduct = $product->first();

    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $user = $user->where('id', $user->id)->with('subscriptions')->first();


    $entreprise = Entreprise::factory(1)->create();

    $entreprise = $entreprise->first();

    $updatedData = [
        "id" => $entreprise->id,
        "name" => "Updated Name"
    ];
    $response = $this->actingAs($user)->patch(route('entreprise.update'), $updatedData);
    
    $updatedEntreprise = Entreprise::find($entreprise->id);

    $response->assertStatus(403);
    $this->assertNotEquals($updatedData['name'], $updatedEntreprise->name);
});
