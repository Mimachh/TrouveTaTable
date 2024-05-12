<?php

namespace App\Http\Controllers\Dashboard\Tables;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Http\Request;

class DeleteTableController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Restaurant $restaurant, Table $table)
    {
        $table->delete();
    }
}
