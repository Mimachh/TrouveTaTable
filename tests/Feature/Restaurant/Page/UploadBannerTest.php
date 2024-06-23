<?php

declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

it('can not upload banner if not auth', function () {
    $restaurant = Restaurant::factory()->create();
    post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => UploadedFile::fake()->image('banner.jpg')
    ])->assertRedirect('/login');
});


it('can not upload banner if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => null,
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => UploadedFile::fake()->image('banner.jpg')
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'banner' => null,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not upload banner if auth and restaurant not his', function () {
    $restaurant = Restaurant::factory()->create([
        'banner' => null
    ]);

    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'banner' => UploadedFile::fake()->image('banner.jpg'),
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => null
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'banner' => null
    ]);
    $response->assertStatus(403);
});

it('can not upload banner if type mime not good', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => null,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => $file = UploadedFile::fake()->image('banner.gif')
    ])->assertSessionHasErrors('banner');
    assertDatabaseHas('restaurants', [
        'banner' => null
    ]);
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
});

it('can upload banner if auth and restaurant is his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => null,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => $file = UploadedFile::fake()->image('banner.webp')
    ])->assertSessionHasNoErrors();
    
    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'banner' => '/storage/restaurant-' . $restaurant->id . '/banner/' . $file->hashName()
    ]);
    $response->assertStatus(200);
});

it('can not delete banner if no restaurant and restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => null,
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => $file = UploadedFile::fake()->image('banner.webp')
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $response2 = $this->actingAs($user2)->delete(route('dashboard.banner.delete', ['restaurant' => $restaurant->id]));
   
    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'banner' => '/storage/restaurant-' . $restaurant->id . '/banner/' . $file->hashName()
    ]); 
    $response2->assertRedirect(route('restaurant.create'));

});

it('can not delete banner if restaurant but restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => null,
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.banner.update', ['restaurant' => $restaurant->id]), [
        'banner' => $file = UploadedFile::fake()->image('banner.webp')
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'banner' => null,
        'owner_id' => $user2->id
    ]);
    $response2 = $this->actingAs($user2)->delete(route('dashboard.banner.delete', ['restaurant' => $restaurant->id]));

    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'banner' => '/storage/restaurant-' . $restaurant->id . '/banner/' . $file->hashName()
    ]); 
    $response2->assertStatus(403);

});

it('can delete banner if auth and restaurant is his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'banner' => $file = UploadedFile::fake()->image('banner.webp'),
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->delete(route('dashboard.banner.delete', ['restaurant' => $restaurant->id]));
   
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'banner' => null
    ]); 

});
