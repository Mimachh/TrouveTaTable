<?php
declare(strict_types=1);

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Stripe\StripeClient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

it('can not enable a restaurant page if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
    $response = put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertRedirect('/login');

});

it('can not enable a restaurant page if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not enable a restaurant page if auth and restaurant not his', function () { 
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false
    ]);
 
    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'enable_page' => false,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertStatus(403);
});

it('can not enable a restaurant page if auth but not fondator', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'enable_page' => false,
    ]);
    $response->assertStatus(403);
});

it('can enable a restaurant page if auth and fondator and his restaurant', function () {
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
    $user = User::factory()->create();

    actingAs($user)
    ->post(route('subscribe.store', [
        'paymentMethod' => $paymentIntent->payment_method,
        'selectedProductId' => $product->id,
        'recurrence' => 'monthly'
    ]));
    
    $restaurant = Restaurant::factory()->create([
        'enable_page' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.page.enable', ['restaurant' => $restaurant->id]), [
        'enable_page' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'enable_page' => true,
    ]);
    $response->assertStatus(201);
});