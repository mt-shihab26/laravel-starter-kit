<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Teams\TeamController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\Teams\TeamMemberController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/.well-known/passkey-endpoints', [HomeController::class, 'wellknown'])->name('well-known.passkeys');

Route::prefix('/{current_team}')->middleware(['auth', 'verified', EnsureTeamMembership::class])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('/invitations/{invitation}')->group(function () {
        Route::post('/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
        Route::delete('/', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
    });

    Route::prefix('/settings')->group(function () {
        Route::redirect('/', '/settings/profile');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::middleware('verified')->group(function () {
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

            Route::get('/security', [SecurityController::class, 'edit'])->middleware(RequirePassword::class)->name('security.edit');

            Route::put('/password', [SecurityController::class, 'update'])->middleware('throttle:6,1')->name('user-password.update');

            Route::inertia('/appearance', 'settings/appearance')->name('appearance.edit');

            Route::prefix('/teams')->group(function () {
                Route::get('/', [TeamController::class, 'index'])->name('teams.index');
                Route::post('/', [TeamController::class, 'store'])->name('teams.store');

                Route::middleware(EnsureTeamMembership::class)->group(function () {
                    Route::get('/{team}', [TeamController::class, 'edit'])->name('teams.edit');
                    Route::patch('/{team}', [TeamController::class, 'update'])->name('teams.update');
                    Route::delete('/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
                    Route::post('/{team}/switch', [TeamController::class, 'switch'])->name('teams.switch');
                    Route::delete('/{team}/leave', [TeamController::class, 'leave'])->name('teams.leave');

                    Route::patch('/{team}/members/{user}', [TeamMemberController::class, 'update'])->name('teams.members.update');
                    Route::delete('/{team}/members/{user}', [TeamMemberController::class, 'destroy'])->name('teams.members.destroy');

                    Route::post('/{team}/invitations', [TeamInvitationController::class, 'store'])->name('teams.invitations.store');
                    Route::delete('/{team}/invitations/{invitation}', [TeamInvitationController::class, 'destroy'])->name('teams.invitations.destroy');
                });
            });
        });
    });
});
