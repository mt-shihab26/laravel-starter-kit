<?php

namespace App\Http\Controllers;

use Laravel\Fortify\Features;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}
