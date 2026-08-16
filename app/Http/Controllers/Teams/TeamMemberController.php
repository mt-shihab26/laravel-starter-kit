<?php

namespace App\Http\Controllers\Teams;

use App\Enums\TeamRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\UpdateTeamMemberRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Update the specified team member's role.
     */
    public function update(UpdateTeamMemberRequest $request, Team $team, User $user): RedirectResponse
    {
        abort_unless($request->user()->canManageTeam($team), 403);

        $newRole = TeamRole::from($request->validated('role'));

        $team->teamMembers()
            ->where('user_id', $user->id)
            ->firstOrFail()
            ->update(['role' => $newRole]);

        return redirect()
            ->route('teams.edit', ['team' => $team->id])
            ->with('success', __('Member role updated.'));
    }

    /**
     * Remove the specified team member.
     */
    public function destroy(Request $request, Team $team, User $user): RedirectResponse
    {
        abort_unless($request->user()->canManageTeam($team), 403);

        abort_if($team->owner()?->is($user), 403, __('The team owner cannot be removed.'));

        $team->teamMembers()
            ->where('user_id', $user->id)
            ->delete();

        if ($fallbackTeam = $user->getResolveFallbackTeam($team)) {
            $user->switchCurrentTeam($fallbackTeam);
        }

        return redirect()
            ->route('teams.edit', ['team' => $team->id])
            ->with('success', __('Member removed.'));
    }
}
