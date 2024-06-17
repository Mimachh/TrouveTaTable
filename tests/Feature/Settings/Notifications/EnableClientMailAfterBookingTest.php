<?php
declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;


use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;


it('can not enable client mail if not auth', function () {
    $restaurant = Restaurant::factory()->create([
        'is_notify_client_after_booking' => false
    ]);
    $response = put(route('dashboard.settings.notifications.notify-after-booking-client', ['restaurant' => $restaurant->id]), [
        'is_notify_client_after_booking' => true,
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'is_notify_client_after_booking' => false,
    ]);
    $response->assertRedirect('/login');

});


it('can not enable a client mail if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'is_notify_client_after_booking' => false
    ]);
    $response = $this->actingAs($user)->put(route('dashboard.settings.notifications.notify-after-booking-client', ['restaurant' => $restaurant->id]), [
        'is_notify_client_after_booking' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'is_notify_client_after_booking' => false,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});


it('can not enable client mail if auth and restaurant not his', function () { 
    $restaurant = Restaurant::factory()->create([
        'is_notify_client_after_booking' => false
    ]);
 
    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'is_notify_client_after_booking' => false,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route('dashboard.settings.notifications.notify-after-booking-client', ['restaurant' => $restaurant->id]), [
        'is_notify_client_after_booking' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'is_notify_client_after_booking' => false,
    ]);
    $response->assertStatus(403);
});

// Even without subscription he can enable client mail but i won't works
it('can enable client mail if auth and restaurant is his', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'is_notify_client_after_booking' => false,
        'owner_id' => $user->id
    ]);
 
    $response = $this->actingAs($user)->put(route('dashboard.settings.notifications.notify-after-booking-client', ['restaurant' => $restaurant->id]), [
        'is_notify_client_after_booking' => true,
    ]);
    assertDatabaseHas('restaurants', [
        'is_notify_client_after_booking' => true,
    ]);
    $response->assertStatus(200);
});