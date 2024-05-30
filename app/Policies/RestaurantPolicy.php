<?php

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RestaurantPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    public function deleteRestaurantService(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Restaurant $restaurant): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Restaurant $restaurant): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Restaurant $restaurant): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Restaurant $restaurant): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Restaurant $restaurant): bool
    {
        //
    }

    public function createTable(User $user, Restaurant $restaurant): bool {
        return $user->id === $restaurant->owner_id;
    }
    public function enablePage(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }

    public function updatePage(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }

    public function updateBanner(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }

    public function updateAvatar(User $user, Restaurant $restaurant): bool 
    {
        return $user->id === $restaurant->owner_id;
    }

    public function updateMedia(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }

    public function unsubscribeNewsletterUser(User $user, Restaurant $restaurant): bool
    {
        return $user->id === $restaurant->owner_id;
    }
}
