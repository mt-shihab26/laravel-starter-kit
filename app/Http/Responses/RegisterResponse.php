<?php

namespace App\Http\Responses;

use App\Models\Team;
use App\Models\User;
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

        /** @var User $user */
        $user = $request->user();

        abort_if(! $user, 403);

        /** @var Team $team */
        $team = $user->getCurrentTeam();

        abort_if(! $team, 403);

        $redirect = "/{$team->id}".Fortify::redirects('register');

        return redirect()->intended($redirect);
    }
}
