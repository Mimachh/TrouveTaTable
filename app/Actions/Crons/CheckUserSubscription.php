<?php

declare(strict_types=1);

namespace App\Actions\Crons;

use App\Models\User;
use App\Repositories\UserRepository;

class CheckUserSubscription
{
    public UserRepository $userRepository;
    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    public function handle()
    {
        $users = User::all();
        foreach ($users as $user) {
            if ($this->userRepository->isFondator($user->id)) {
                $this->ifFondator($user);
            } else {
                $this->ifNotFondator($user);
            }
        }
    }

    private function ifFondator(User $user)
    {
        $subscription = $user->subscriptions->first();
        if ($subscription->ends_at && $subscription->ends_at < now()) {
            $restaurants = $user->restaurants;
            if ($restaurants->count() > 0) {
                foreach ($restaurants as $restaurant) {
                    $restaurant->accept_reservations = false;
                    $restaurant->accept_rating = false;
                    $restaurant->accept_messages = false;
                    $restaurant->enable_page = false;
                    $restaurant->save();
                }
            }
        }
    }

    private function ifNotFondator(User $user)
    {
        $restaurants = $user->restaurants;
        if ($restaurants->count() > 0) {
            foreach ($restaurants as $restaurant) {
                $restaurant->accept_reservations = false;
                $restaurant->accept_rating = false;
                $restaurant->accept_messages = false;
                $restaurant->enable_page = false;
                $restaurant->save();
            }
        }
    }
}
