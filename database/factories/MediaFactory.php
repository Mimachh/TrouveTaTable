<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'imageable_type' => $this->faker->word,
            'imageable_uuid_id' => $this->faker->uuid,
            'imageable_id_id' => $this->faker->randomNumber(),
            'name' => $this->faker->word,
            'path' => $this->faker->word,
            'mime' => $this->faker->word,
            'size' => $this->faker->randomNumber(),
            'created_by' => $this->faker->randomNumber(),
            'created_at' => $this->faker->dateTime(),
        ];
    }
}
