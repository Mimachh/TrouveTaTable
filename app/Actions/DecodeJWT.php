<?php

declare(strict_types=1);

namespace App\Actions;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class DecodeJWT
{
    public function handle(string $jwt): array
    {
        $key = config('jwt.secret_key');
        
        return [
            'decoded' => JWT::decode($jwt, new Key($key, 'HS256')),
        ];
    }
}