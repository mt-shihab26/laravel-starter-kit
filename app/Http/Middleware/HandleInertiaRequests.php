<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var ?User $user */
        $user = $request->user();

        return [
            ...parent::share($request),
            'ziggy' => fn () => [...(new Ziggy)->toArray(), 'location' => $request->url()],
            'name' => config('app.name'),
            'open' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'auth' => [
                'user' => $user,
                'team' => fn () => $user?->getCurrentTeam(),
                'teams' => fn () => $user?->teams ?? [],
                'canManageTeam' => fn () => $user?->canManageTeam($user->getCurrentTeam()) ?? false,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
        ];
    }
}
