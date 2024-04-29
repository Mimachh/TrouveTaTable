<?php

namespace App\Enums; 

enum TableStatus: string {
    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case OCCUPIED = 'occupied';
    case UNAVAILABLE = 'unavailable';
}