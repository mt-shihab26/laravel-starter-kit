<?php

namespace App\Providers;

use App\Actions\Auth\CreateNewUser;
use App\Actions\Auth\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registration();
        $this->login();
        $this->passwords();
    }

    /**
     * Configure Fortify's registration and email verification views and actions.
     */
    protected function registration(): void
    {
        Fortify::registerView(fn () => inertia('auth/register'));
        Fortify::createUsersUsing(CreateNewUser::class);

        Fortify::verifyEmailView(fn (Request $request) => inertia('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));
    }

    /**
     * Configure Fortify's login view and login rate limiter.
     */
    protected function login(): void
    {
        Fortify::loginView(fn (Request $request) => inertia('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    /**
     * Configure Fortify's password reset, confirmation, two-factor challenge views, and rate limiters.
     */
    protected function passwords(): void
    {
        Fortify::requestPasswordResetLinkView(fn (Request $request) => inertia('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => inertia('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        Fortify::confirmPasswordView(fn () => inertia('auth/confirm-password'));

        Fortify::twoFactorChallengeView(fn () => inertia('auth/two-factor-challenge'));

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
