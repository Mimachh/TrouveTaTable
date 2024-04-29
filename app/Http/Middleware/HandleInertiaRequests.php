<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public $isSub;
    public function share(Request $request): array
    {
        $user = $request->user();
        if($user) {
            $this->isSub = User::where('id', $user->id)->with('subscriptions')->first();
        }

        return [
            ...parent::share($request),
            // 'auth' => [
            //     'user' => $request->user(),
                
            // ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'csrf_token' => csrf_token(),
            'auth' => function () use ($request) {
                $user = $request->user();
                if ($user) {
                    $user = $request->user()->load('roles');
                    $user->isSub = $this->isSub->subscriptions->count() > 0 ? true : false;
                }
                return ['user' => $user];
            },
        ];
    }
}
