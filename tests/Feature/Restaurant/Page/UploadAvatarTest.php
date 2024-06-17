<?php

declare(strict_types=1);

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

it('can not upload avatar if not auth', function () {
    $restaurant = Restaurant::factory()->create();
    post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => UploadedFile::fake()->image('avatar.jpg')
    ])->assertRedirect('/login');
});


it('can not upload avatar if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => null,
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => UploadedFile::fake()->image('avatar.jpg')
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'avatar' => null,
    ]);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not upload avatar if auth and restaurant not his', function () {
    $restaurant = Restaurant::factory()->create([
        'avatar' => null
    ]);

    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => null
    ]);
    // dd($response->getContent());
    assertDatabaseHas('restaurants', [
        'avatar' => null
    ]);
    $response->assertStatus(403);
});

it('can not upload avatar if type mime not good', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => null,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => $file = UploadedFile::fake()->image('avatar.gif')
    ])->assertSessionHasErrors('avatar');
    assertDatabaseHas('restaurants', [
        'avatar' => null
    ]);
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/avatar/' . $file->hashName());
});

it('can upload avatar if auth and restaurant is his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => null,
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => $file = UploadedFile::fake()->image('avatar.webp')
    ])->assertSessionHasNoErrors();
    
    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/avatar/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'avatar' => '/storage/restaurant-' . $restaurant->id . '/avatar/' . $file->hashName()
    ]);
    $response->assertStatus(200);
});

it('can not delete avatar if no restaurant and restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => null,
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => $file = UploadedFile::fake()->image('avatar.webp')
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $response2 = $this->actingAs($user2)->delete(route('dashboard.avatar.delete', ['restaurant' => $restaurant->id]));
   
    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/avatar/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'avatar' => '/storage/restaurant-' . $restaurant->id . '/avatar/' . $file->hashName()
    ]); 
    $response2->assertRedirect(route('restaurant.create'));

});

it('can not delete avatar if restaurant but restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => null,
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.avatar.update', ['restaurant' => $restaurant->id]), [
        'avatar' => $file = UploadedFile::fake()->image('avatar.webp')
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'avatar' => null,
        'owner_id' => $user2->id
    ]);
    $response2 = $this->actingAs($user2)->delete(route('dashboard.avatar.delete', ['restaurant' => $restaurant->id]));

    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/avatar/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'avatar' => '/storage/restaurant-' . $restaurant->id . '/avatar/' . $file->hashName()
    ]); 
    $response2->assertStatus(403);

});

it('can delete avatar if auth and restaurant is his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'avatar' => $file = UploadedFile::fake()->image('avatar.webp'),
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->delete(route('dashboard.avatar.delete', ['restaurant' => $restaurant->id]));
   
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/avatar/' . $file->hashName());
    assertDatabaseHas('restaurants', [
        'avatar' => null
    ]); 

});
