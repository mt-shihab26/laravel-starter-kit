<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Fortify;
use Symfony\Component\HttpFoundation\Response;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request): Response
    {
        if ($request->wantsJson()) {
            return new JsonResponse(['two_factor' => false], 201);
        }

        $user = $request->user();
        abort_if(! $user, 403);

        $team = $user->currentTeam ?? $user->getFallbackTeam();
        abort_if(! $team, 403);

        $redirect = "/{$team->id}".Fortify::redirects('register');

        return redirect()->intended($redirect);
    }
}
