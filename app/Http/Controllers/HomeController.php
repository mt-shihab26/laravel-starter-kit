<?php

namespace App\Http\Controllers;

use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index(): Response
    {
        return inertia('welcome');
    }

    /**
     * Handle the well known request.
     */
    public function wellknown()
    {
        return response()->json([
            'enroll' => route('security.edit'),
            'manage' => route('security.edit'),
        ]);
    }
}
