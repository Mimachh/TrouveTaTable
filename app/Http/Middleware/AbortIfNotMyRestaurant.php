<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AbortIfNotMyRestaurant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $restaurant = $request->route('restaurant');
        if (auth()->user()->restaurants->contains($restaurant->id) || auth()->user()->isAdmin()) {
            return $next($request);
        }
        abort(403, 'Vous n\'avez pas accès à ce restaurant');
    }
}
