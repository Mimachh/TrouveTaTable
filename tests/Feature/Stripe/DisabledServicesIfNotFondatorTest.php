<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;

 // user 1 n'a pas d'abonnement mais il a un resto ou tout est actif
    // user 2 n'a pas d'abonnement mais il a un resto ou tout est inactif
    // user 3 pas d'abo pas de resto
    // user 4 a un abo mais pas de resto
    // user 5 a un abo et un resto actif
    // user 6 a un abo et un resto inactif
    // user 7 a un abo qui expire dans 2 jours et un resto actif
    // user 8 a un abo qui a expiré hier et un resto actif

it('disabled all restaurants services if not fondator', function () {
    $users = User::factory(8)->create();
    $stripe = new StripeClient(config('stripe.stripe_secret'));
    $product = Product::factory()->create([
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

    // USER 1
    $restaurant1 = Restaurant::factory()->create([
        "accept_reservations" => true,
        "accept_rating" => true,
        "accept_messages" => true,
        "enable_page" => true,
        "owner_id" => $users[0]->id
    ]);
    assertDatabaseCount('restaurants', 1);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[0]->id
    ]);


    // USER 2
    $restaurant2 = Restaurant::factory()->create([
        "accept_reservations" => false,
        "accept_rating" => false,
        "accept_messages" => false,
        "enable_page" => false,
        "owner_id" => $users[1]->id
    ]);
    assertDatabaseCount('restaurants', 2);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[1]->id
    ]);

    // USER 3
    // pas d'abo pas de resto

    // USER 4
    $paymentIntent1 = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);
    $sub1 = actingAs($users[3])
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent1->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));


    // USER 5
    $paymentIntent2 = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);
    $sub2 = actingAs($users[4])
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent2->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant5 = Restaurant::factory()->create([
        "accept_reservations" => true,
        "accept_rating" => true,
        "accept_messages" => true,
        "enable_page" => true,
        "owner_id" => $users[4]->id
    ]);
    assertDatabaseCount('restaurants', 3);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[4]->id
    ]);


    // USER 6
    $paymentIntent3 = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);

    $sub3 = actingAs($users[5])
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent3->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant6 = Restaurant::factory()->create([
        "accept_reservations" => false,
        "accept_rating" => false,
        "accept_messages" => false,
        "enable_page" => false,
        "owner_id" => $users[5]->id
    ]);
    assertDatabaseCount('restaurants', 4);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[5]->id
    ]);


    // USER 7
    $paymentIntent4 = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);
    $sub4 = actingAs($users[6])
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent4->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant7 = Restaurant::factory()->create([
        "accept_reservations" => true,
        "accept_rating" => true,
        "accept_messages" => true,
        "enable_page" => true,
        "owner_id" => $users[6]->id
    ]);
    assertDatabaseCount('restaurants', 5);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[6]->id
    ]); 
    $users[6]->subscriptions->first()->update([
        'ends_at' => now()->addDays(2)
    ]);
    assertDatabaseHas('subscriptions', [
        'ends_at' => now()->addDays(2),
        'user_id' => $users[6]->id
    ]);


    // USER 8
    $paymentIntent5 = $stripe->paymentIntents->create([
        'amount' => 200,
        'currency' => 'eur',
        'payment_method' => 'pm_card_visa',
        'setup_future_usage' => 'on_session',
    ]);
    $sub5 = actingAs($users[7])
        ->post(route('subscribe.store', [
            'paymentMethod' => $paymentIntent5->payment_method,
            'selectedProductId' => $firstProduct->id,
            'recurrence' => 'monthly'
        ]));

    $restaurant8 = Restaurant::factory()->create([
        "accept_reservations" => true,
        "accept_rating" => true,
        "accept_messages" => true,
        "enable_page" => true,
        "owner_id" => $users[7]->id
    ]);
    assertDatabaseCount('restaurants', 6);
    assertDatabaseHas('restaurants', [
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[7]->id
    ]);
    $users[7]->subscriptions->first()->update([
        'ends_at' => now()->subDay()
    ]);
    assertDatabaseHas('subscriptions', [
        'ends_at' => now()->subDay(),
        'user_id' => $users[7]->id
    ]);

    assertDatabaseCount('subscriptions', 5);
   
    $this->artisan('app:check-subscription-job');

    assertDatabaseHas('restaurants', [
        "id" => $restaurant1->id,
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[0]->id
    ]);

    assertDatabaseHas('restaurants', [
        "id" => $restaurant2->id,
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[1]->id
    ]);

    assertDatabaseHas('restaurants', [
        "id" => $restaurant5->id,
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[4]->id
    ]);

    assertDatabaseHas('restaurants', [
        "id" => $restaurant6->id,
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[5]->id
    ]);

    assertDatabaseHas('restaurants', [
        "id" => $restaurant7->id,
        'accept_reservations' => true,
        'accept_rating' => true,
        'accept_messages' => true,
        'enable_page' => true,
        'owner_id' => $users[6]->id
    ]);

    assertDatabaseHas('restaurants', [
        "id" => $restaurant8->id,
        'accept_reservations' => false,
        'accept_rating' => false,
        'accept_messages' => false,
        'enable_page' => false,
        'owner_id' => $users[7]->id
    ]);
});
