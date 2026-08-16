<?php

namespace App\Http\Controllers\Teams;

use App\Actions\Teams\CreateTeam;
use App\Enums\TeamRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\DeleteTeamRequest;
use App\Http\Requests\Teams\SaveTeamRequest;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Display a listing of the user's teams.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return inertia('teams/index', [
            'teams' => $user->toUserTeams(includeCurrent: true),
        ]);
    }

    /**
     * Store a newly created team.
     */
    public function store(SaveTeamRequest $request, CreateTeam $createTeam): RedirectResponse
    {
        $team = $createTeam->handle($request->user(), $request->validated('name'));

        return redirect()
            ->route('teams.edit', ['team' => $team->id])
            ->with('success', __('Team created.'));
    }

    /**
     * Show the team edit page.
     */
    public function edit(Request $request, Team $team): Response
    {
        $user = $request->user();

        return inertia('teams/edit', [
            'team' => [
                'id' => $team->id,
                'name' => $team->name,
            ],
            'members' => $team->users()->get()->map(function (User $member) {
                /** @var TeamMember $membership */
                $membership = $member->getRelation('pivot');

                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'avatar' => $member->avatar ?? null,
                    'role' => $membership->role->value,
                    'role_label' => $membership->role->label(),
                ];
            }),
            'invitations' => $team->invitations()
                ->whereNull('accepted_at')
                ->get()
                ->map(fn ($invitation) => [
                    'code' => $invitation->code,
                    'email' => $invitation->email,
                    'role' => $invitation->role->value,
                    'role_label' => $invitation->role->label(),
                    'created_at' => $invitation->created_at->toISOString(),
                ]),
            'canManageTeam' => $user->canManageTeam($team),
            'availableRoles' => TeamRole::assignable(),
        ]);
    }

    /**
     * Update the specified team.
     */
    public function update(SaveTeamRequest $request, Team $team): RedirectResponse
    {
        abort_unless($request->user()->canManageTeam($team), 403);

        $team = DB::transaction(function () use ($request, $team) {
            $team = Team::whereKey($team->id)->lockForUpdate()->firstOrFail();

            $team->update(['name' => $request->validated('name')]);

            return $team;
        });

        return redirect()
            ->route('teams.edit', ['team' => $team->id])
            ->with('success', __('Team updated.'));
    }

    /**
     * Switch the user's current team.
     */
    public function switch(Request $request, Team $team): RedirectResponse
    {
        abort_unless($request->user()->isBelongsToTeam($team), 403);

        $request->user()->switchCurrentTeam($team);

        return back();
    }

    /**
     * Leave the specified team.
     */
    public function leave(Request $request, Team $team): RedirectResponse
    {
        $user = $request->user();

        abort_if(! $user->isBelongsToTeam($team) || $user->isOwnsTeam($team), 403);

        $fallbackTeam = $user->isCurrentTeam($team)
            ? $user->getFallbackTeam($team)
            : null;

        $team->teamMembers()
            ->where('user_id', $user->id)
            ->delete();

        if ($fallbackTeam) {
            $user->switchCurrentTeam($fallbackTeam);
        }

        return redirect()
            ->route('teams.index')
            ->with('success', __('You left the team ":name"', ['name' => $team->name]));
    }

    /**
     * Delete the specified team.
     */
    public function destroy(DeleteTeamRequest $request, Team $team): RedirectResponse
    {
        abort_unless($request->user()->canManageTeam($team), 403);

        $user = $request->user();
        $fallbackTeam = $user->isCurrentTeam($team)
            ? $user->getFallbackTeam($team)
            : null;

        DB::transaction(function () use ($user, $team) {
            User::where('current_team_id', $team->id)
                ->where('id', '!=', $user->id)
                ->each(fn (User $affectedUser) => $affectedUser->switchCurrentTeam($affectedUser->getFallbackTeam($team)));

            $team->invitations()->delete();
            $team->teamMembers()->delete();
            $team->delete();
        });

        if ($fallbackTeam) {
            $user->switchCurrentTeam($fallbackTeam);
        }

        return redirect()
            ->route('teams.index')
            ->with('success', __('Team deleted.'));
    }
}
