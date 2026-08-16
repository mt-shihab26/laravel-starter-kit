<?php

namespace App\Http\Middleware;

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTeamMembership
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ?string $minimumRole = null): Response
    {
        /** @var ?User $user */
        $user = $request->user();
        $team = $this->getTeam($request);

        abort_if(! $user || ! $team || ! $user->isBelongsToTeam($team), 403);

        $this->ensureTeamMemberHasRequiredRole($user, $team, $minimumRole);

        if (! $user->isCurrentTeam($team)) {
            $user->switchCurrentTeam($team);
        }

        return $next($request);
    }

    /**
     * Ensure the given user has at least the given role, if applicable.
     */
    protected function ensureTeamMemberHasRequiredRole(User $user, Team $team, ?string $minimumRole): void
    {
        if ($minimumRole === null) {
            return;
        }

        $role = $team->teamMemberFor($user)?->role;

        $requiredRole = TeamRole::tryFrom($minimumRole);

        abort_if(
            $requiredRole === null ||
            $role === null ||
            ! $role->isAtLeast($requiredRole),
            403,
        );
    }

    /**
     * Get the team associated with the request.
     */
    protected function getTeam(Request $request): ?Team
    {
        $team = $request->route('team');

        if (is_string($team)) {
            $team = Team::find($team);
        }

        return $team;
    }
}
