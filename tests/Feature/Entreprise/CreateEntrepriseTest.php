<?php

declare(strict_types=1);

use App\Models\EntrepriseStatus;
use App\Models\Product;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;

it('can create if subscribed', function () {
    $stripe = new StripeClient(config('stripe.stripe_secret'));

    $user = User::factory()->create();
    EntrepriseStatus::factory(3)->create();
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


    actingAs($user)
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));
       
    $userSub = $user->where('id', $user->id)->with('subscriptions')->first();

    actingAs($userSub)->patch(route('entreprise.update', [
        "id" => null,
        'name' => 'Test entreprise',
        'owner_last_name' => 'Doe',
        'owner_first_name' => 'John',
        'siret' => '123456789',
        'street' => '1 rue de la paix',
        'city' => 'Paris',
        'zipcode' => '75000',
        'country' => 'France',
        'phone' => '0123456789',
        'email' => 'mimach.dev@gmail.com',
        "user_id" => $userSub->id,
        "entreprise_status_id" => 1
    ]));
    
    assertDatabaseCount('entreprises', 1);
});


it('redirect if not subscribed and post', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->patch(route('entreprise.update', [
        'name' => 'Test entreprise',
        'owner_last_name' => 'Doe',
        'owner_first_name' => 'John',
        'siret' => '123456789',
        'street' => '1 rue de la paix',
        'city' => 'Paris',
        'zipcode' => '75000',
        'country' => 'France',
        'phone' => '0123456789',
        'email' => 'mimach.dev@gmail.com'
    ]));

    // $redirectUrl = $response->headers->get('Location');
    
    // dd($redirectUrl);
    $response->assertRedirect(route('dashboard'));

    assertDatabaseCount('entreprises', 0);
});

