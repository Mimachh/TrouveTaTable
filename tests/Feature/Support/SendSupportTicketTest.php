<?php

declare(strict_types=1);

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\post;

it('can send ticket if auth', function () {
    $user = User::factory()->create();
    $response = actingAs($user)->post(route('support.send'), [
        'subject' => 'test',
        'message' => 'test',
    ]);
    assertDatabaseHas('supports', [
        'subject' => 'test',
        'message' => 'test',
        'user_id' => $user->id,
    ]);
});

it('can not send ticket if not auth', function () {
    $response = post(route('support.send'), [
        'subject' => 'test',
        'message' => 'test',
    ]);
    $response->assertRedirect('/login');
    assertDatabaseMissing('supports', [
        'subject' => 'test',
        'message' => 'test',
    ]);
});