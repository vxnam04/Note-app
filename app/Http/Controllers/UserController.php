<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::with('role')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|exists:roles,id'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        return response()->json(['message' => 'Tạo tài khoản thành công', 'user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6',
            'role' => 'nullable|exists:roles,id'
        ]);

        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'role' => $request->role_id ?? $user->role,
            'password' => $request->password ? Hash::make($request->password) : $user->password
        ]);

        return response()->json(['message' => 'Cập nhật thành công', 'user' => $user]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Không xóa chính mình
        if (auth()->id() == $user->id) {
            return response()->json(['message' => 'Không thể tự xóa chính mình'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Đã xóa người dùng']);
    }
}
