<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository {
    public function isFondator(int $id) {
        $user = User::find($id);
        // optional(auth()->user()->subscription("Pack Fondateur"))->syncStripeStatus();
        return $user->subscribed("Pack Fondateur");
    }
}