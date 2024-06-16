<?php

namespace App\Http\Resources;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = null;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'roles' => $this->roles,
            'trial_ends_at' => $this->trial_ends_at,
            'isFondator' => (new UserRepository())->isFondator($this->id),
            'subscriptions' => $this->whenLoaded('subscriptions'),
        ];
    }
}
