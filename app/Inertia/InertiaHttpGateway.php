<?php

namespace App\Inertia;

use Illuminate\Support\Str;
use Inertia\Ssr\HttpGateway;
use \Inertia\Ssr\Response;

class InertiaHttpGateway extends HttpGateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     *
     * @param array $page
     * @return Response|null
     */
    public function dispatch(array $page): ?Response
    {
        if (isset($page['url']) && Str::is('/dashboard*', $page['url'])) {
            return null;
        }

        return parent::dispatch($page);
    }
}