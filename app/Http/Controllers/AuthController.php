<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => Role::where('name', 'user')->first()->id, // Gán role là user
        ]);

        return response()->json(['message' => 'Đăng ký thành công'], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->with('role')->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập không đúng.'],
            ]);
        }

        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user, // Có cả role
        ]);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Đã đăng xuất']);
    }

    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|exists:roles,id'
        ]);

        $user = User::findOrFail($id);

        // Không cho đổi role chính mình
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'Không thể thay đổi vai trò chính bạn'], 403);
        }

        $user->role_id = $request->role_id;
        $user->save();

        return response()->json([
            'message' => 'Cập nhật quyền thành công',
            'user' => $user->load('role')
        ]);
    }
}
