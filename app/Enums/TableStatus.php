<?php

namespace App\Enums;

use Illuminate\Support\Facades\Lang;
use UnexpectedValueException;

enum TableStatus: string
{
    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case OCCUPIED = 'occupied';
    case UNAVAILABLE = 'unavailable';


    public static function fromValue(string $value): self {
        foreach (self::cases() as $case) {
            if ($case->value === $value) {
                return $case;
            }
        }
    
        throw new UnexpectedValueException("La valeur $value ne correspond à aucun cas d'énumération");
    }
}
