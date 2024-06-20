<?php

declare(strict_types=1);

use App\Models\Restaurant;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\post;

it('can send message to restaurant', function () {
 
    $restaurant = Restaurant::factory()->create();
    
    post(route('message.send'), [
        'subject' => 'Test subject',
        'content' => 'Test content',
        'email' => 'mimach.dev@gmail.com',
        'last_name' => 'Mimach',
        'first_name' => 'Mohammed',
        'phone' => '0666666666',
        'restaurant_id' => $restaurant->id
    ]);

    assertDatabaseCount('messages', 1);

    // vérifier que le restaurant a bien reçu le message
    $message = $restaurant->messages()->first();
    expect($message->subject)->toBe('Test subject');
    expect($message->content)->toBe('Test content');

});




