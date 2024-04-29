<?php

declare(stric_types=1);

namespace App\Actions;

use App\Models\Restaurant;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CreateRestaurantJWT
{
    public function handle(Restaurant $restaurant): array
    {

        $key = config('jwt.secret_key');
        
        $payload = array(
            "uuid" => $restaurant->id,
            "name" => $restaurant->name,
        );
        $jwt = JWT::encode($payload, $key, 'HS256');
        return [
            'jwt' => $jwt,
        ];
    }
}