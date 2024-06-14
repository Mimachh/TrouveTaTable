<?php

namespace App\Http\Controllers\Changelog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexChangelogController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('Changelog/Index');
    }
}
