<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;

class AppearanceController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        return inertia('settings/appearance');
    }
}
