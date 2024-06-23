<?php

declare(strict_types=1);

use App\Models\Media;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

// return [
//     "attachments" => [
//         'array', 'max:5',
//         function ($attribute, $value, $fail) {

//             $totalSize = collect($value)->sum(fn(UploadedFile $file) => $file->getSize());
//             if($totalSize > 1 * 1024 * 1024 * 1024) {
//                 $fail('The total size of the files must not exceed 1GB');
//             }
//         }
//     ],
//     "attachments.*" => [
//         'file',
//         File::types(self::$extensions)
//     ]
// ];

it('can not upload media if not auth', function () {
    $restaurant = Restaurant::factory()->create();
    post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            'file' => UploadedFile::fake()->image('media.jpg')
        ]
    ])->assertRedirect('/login');
});


it('can not upload media if restaurant not his and no have restaurant', function () {
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create();

    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            'file' => UploadedFile::fake()->image('media.jpg')
        ]
    ]);
    // dd($response->getContent());
    assertDatabaseCount('media', 0);
    $response->assertRedirect(route('restaurant.create'));
});

it('can not upload media if auth and restaurant not his', function () {
    $restaurant = Restaurant::factory()->create();

    $user = User::factory()->create();
    $restaurantHis = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);

    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            'file' => UploadedFile::fake()->image('media.jpg')
        ]
    ]);
    // dd($response->getContent());
    assertDatabaseCount('media', 0);
    $response->assertStatus(403);
});

it('can not upload media if type mime not good', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);
    $this->withoutExceptionHandling();
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            0 => $file = UploadedFile::fake()->image('media.gif')
        ]
    ]);

    $response->assertStatus(422);

    $response->assertJsonValidationErrors(['attachments.0']);
    assertDatabaseCount('media', 0);
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/media/' . $file->hashName());
});

it('can upload media if type mime is good and restaurant his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            0 => $file = UploadedFile::fake()->image('media.jpg')
        ]
    ]);

    $response->assertSessionHasNoErrors();

   
    assertDatabaseCount('media', 1);
    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/media/' . $file->hashName());
});

it('can not upload media if more than 5', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);
    $this->withoutExceptionHandling();
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        'attachments' => [
            0 => $file = UploadedFile::fake()->image('media.jpg'),
            1 => $file1 = UploadedFile::fake()->image('media1.jpg'),
            2 => $file2 = UploadedFile::fake()->image('media2.jpg'),
            3 => $file3 = UploadedFile::fake()->image('media3.jpg'),
            4 => $file4 = UploadedFile::fake()->image('media4.jpg'),
            5 => $file5 = UploadedFile::fake()->image('media5.jpg')
        ]
    ]);

    $response->assertStatus(422);

    assertDatabaseCount('media', 0);
    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/media/' . $file->hashName());
});

it('can not delete media if no restaurant and restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id,
       
    ]);
    $media = Media::first();
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        "attachments" => [
            0 => $file = UploadedFile::fake()->image('banner.webp')
        ]
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $media = Media::first();
    $response2 = $this->actingAs($user2)->delete(route('dashboard.media.delete', ['restaurant' => $restaurant->id]), [
        'id' => $media->id
    ]);

    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/media/' . $file->hashName());
    assertDatabaseHas('media', [
        'path' => '/storage/restaurant-' . $restaurant->id . '/media/' . $file->hashName()
    ]);
    $response2->assertRedirect(route('restaurant.create'));
});

it('can not delete banner if restaurant but restaurant not his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        "attachments" => [
            0 => $file = UploadedFile::fake()->image('media.webp')
        ]
    ])->assertSessionHasNoErrors();



    $user2 = User::factory()->create();
    $restaurant2 = Restaurant::factory()->create([
        'owner_id' => $user2->id
    ]);
    $media = Media::first();
    $response2 = $this->actingAs($user2)->delete(route('dashboard.media.delete', ['restaurant' => $restaurant->id]),  [
        'id' => $media->id
    ]);

    Storage::disk('public')->assertExists('restaurant-' . $restaurant->id . '/media/' . $file->hashName());
    assertDatabaseHas('media', [
        'path' => '/storage/restaurant-' . $restaurant->id . '/media/' . $file->hashName()
    ]);
    $response2->assertStatus(403);
});

it('can delete banner if auth and restaurant is his', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $restaurant = Restaurant::factory()->create([
        
        'owner_id' => $user->id
    ]);
    $response = $this->actingAs($user)->post(route('dashboard.media.update', ['restaurant' => $restaurant->id]), [
        "attachments" => [
            0 => $file = UploadedFile::fake()->image('media.webp')
        ]
    ])->assertSessionHasNoErrors();
    $media = Media::first();
    $response = $this->actingAs($user)->delete(route('dashboard.media.delete', ['restaurant' => $restaurant->id]), [
        'id' => $media->id
    ]);

    Storage::disk('public')->assertMissing('restaurant-' . $restaurant->id . '/banner/' . $file->hashName());
    assertDatabaseCount('media', 0);
});
