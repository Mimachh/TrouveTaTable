<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NoteRestaurant>
 */
class NoteRestaurantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'rating_restaurant_id' => \App\Models\RatingRestaurant::factory(),
            'rating_restaurant_item_id' => \App\Models\RatingRestaurantItem::factory(),
            'note' => $this->faker->numberBetween(1, 5)
        ];
    }
}
