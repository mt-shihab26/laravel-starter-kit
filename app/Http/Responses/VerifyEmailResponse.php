<?php

namespace App\Http\Responses;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;
use Laravel\Fortify\Fortify;
use Symfony\Component\HttpFoundation\Response;

class VerifyEmailResponse implements VerifyEmailResponseContract
{
    public function toResponse($request): Response
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        /** @var User $user */
        $user = $request->user();

        abort_if(! $user, 403);

        /** @var Team $team */
        $team = $user->getCurrentTeam();

        abort_if(! $team, 403);

        $redirect = "/{$team->id}".Fortify::redirects('email-verification').'?verified=1';

        return redirect()->intended($redirect);
    }
}
