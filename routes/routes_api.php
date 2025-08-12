<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\Api\CityDashboardController;


// Public route (no authentication needed)
Route::post('login', [AuthController::class, 'login']);

// Routes that require authentication
Route::middleware('auth:sanctum')->group(function () {

    // Resource routes
    Route::apiResource('users', UserController::class);
    Route::apiResource('barangays', BarangayController::class);
    Route::apiResource('diagnoses', DiagnosisController::class);
    Route::apiResource('patients', PatientController::class);

    // Dashboard routes
    Route::get('barangay/{id}/dashboard', [BarangayController::class, 'dashboard']);
    Route::get('city/dashboard', [CityController::class, 'dashboard']);

    // Activity logs
    Route::get('activity-logs', [ActivityLogController::class, 'index']);

    // Additional Barangay CRUD routes
    Route::get('/barangays', [BarangayController::class, 'index']);
    Route::post('/barangays', [BarangayController::class, 'store']);

    
  // Additional City CRUD routes
    Route::get('/city/dashboard', [CityDashboardController::class, 'getTopDiagnoses']);
    Route::get('/barangays', [CityDashboardController::class, 'getBarangays']);
    Route::get('/patients', [CityDashboardController::class, 'getPatients']);
});
