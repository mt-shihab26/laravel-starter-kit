<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Fortify;
use Laravel\Passkeys\Contracts\PasskeyLoginResponse as PasskeyLoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class PasskeyLoginResponse implements PasskeyLoginResponseContract
{
    public function toResponse($request): Response
    {
        $user = $request->user();
        abort_if(! $user, 403);

        $team = $user->currentTeam ?? $user->getFallbackTeam();
        abort_if(! $team, 403);

        $redirect = "/{$team->id}".Fortify::redirects('login');

        return $request->wantsJson()
            ? new JsonResponse(['redirect' => redirect()->intended($redirect)->getTargetUrl()], 200)
            : redirect()->intended($redirect);
    }
}
