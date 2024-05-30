<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    const UPDATED_AT = null;

    protected $fillable = [
        'imageable_type',
        'imageable_uuid_id',
        'imageable_id_id',
        'name',
        'path',
        'mime',
        'size',
        'created_by',
        'created_at',
    ];

  

    public function imageable()
    {
        return $this->morphTo(null, 'imageable_type', 'imageable_uuid_id', 'imageable_id_id');
    }
}
