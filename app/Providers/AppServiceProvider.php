<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
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
        $this->configureDefaults();
        $this->configureModels();
        $this->configureAsserts();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        // Use immutable Carbon instances to prevent accidental date mutation.
        Date::use(CarbonImmutable::class);

        // Prevent destructive migration commands (e.g. migrate:fresh) in production.
        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // Enforce strong password rules in production; no restrictions in local/testing.
        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }

    /**
     * Configure Eloquent model conventions and safety guards.
     */
    protected function configureModels(): void
    {
        // Prevent lazy loading, silently discarding attributes, and accessing missing attributes.
        Model::shouldBeStrict();

        // Automatically eager-load relationships when accessed, eliminating N+1 query problems.
        Model::automaticallyEagerLoadRelationships();
    }

    /**
     * Configure frontend asset bundling and prefetching strategy.
     */
    protected function configureAsserts(): void
    {
        // Preload JS chunks (3 at a time) after initial page load so subsequent navigations are instant.
        Vite::prefetch(concurrency: 3);
    }
}
