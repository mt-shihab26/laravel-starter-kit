<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});

Route::prefix('/settings')->middleware(['auth'])->group(function () {
    Route::get('/', [ProfileController::class, 'redirect'])->name('settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('settings.profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('settings.profile.update');

    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('settings.profile.avatar.update');
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('settings.profile.avatar.destroy');

    Route::middleware(['verified'])->group(function () {
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('settings.profile.destroy');

        Route::get('/password', [PasswordController::class, 'edit'])->name('settings.password.edit');
        Route::put('/password', [PasswordController::class, 'update'])->middleware('throttle:6,1')->name('settings.password.update');

        Route::get('/two-factor', [TwoFactorAuthenticationController::class, 'show'])->name('settings.two-factor.show');

        Route::get('/appearance', [AppearanceController::class, 'edit'])->name('settings.appearance.edit');
    });
});
