<?php

//namespace App\Http\Controllers;

//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth; // ✅ Add this

//class AuthController extends Controller
//{
  //  public function login(Request $request)
   // {
     //   $credentials = $request->only('email', 'password');

       // if (!Auth::attempt($credentials)) {
        //    return response()->json(['message' => 'Invalid login'], 401);
        //}

        //$user = Auth::user();
        //$token = $user->createToken('auth_token')->plainTextToken;

        //return response()->json([
          //  'access_token' => $token,
            //'user' => $user
        //]);
   // }
//}
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid login'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Optionally, auto-login after registration:
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            // 'access_token' => $token,
            'user' => $user
        ], 201);
    }
}