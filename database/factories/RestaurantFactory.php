<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'slug' => $this->faker->slug,
            'description' => $this->faker->sentence,
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'zip' => $this->faker->postcode,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website' => $this->faker->url,
            'logo' => $this->faker->imageUrl,
            'cover' => $this->faker->imageUrl,
            'active' => $this->faker->boolean,
            'time_before_service' => null,
            'time_after_service' => "00:30:00",
            'time_to_stop_reservation' => "00:30:00",
            'accept_reservations' => $this->faker->boolean,
            "accept_messages" => $this->faker->boolean,
            "accept_rating" => $this->faker->boolean,
            "enable_page" => $this->faker->boolean,
            "banner" => $this->faker->imageUrl,
            "avatar" => $this->faker->imageUrl,


            "is_notify_client_after_booking" => $this->faker->boolean,
            "is_notify_restaurant_after_booking" => $this->faker->boolean,
            "is_notify_client_a_day_before_booking" => $this->faker->boolean,
            "is_notify_restaurant_after_contact_message" => $this->faker->boolean,
            
            // 'owner_id' => \App\Models\User::factory(),
            'owner_id' => 1,
        ];
    }
}
