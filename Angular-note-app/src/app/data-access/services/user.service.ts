import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'http://laravel-note-app/api'; // Địa chỉ backend Laravel

  constructor(private http: HttpClient) {}

  // Lấy token từ LocalStorage (hoặc nơi bạn lưu trữ)
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token'); // Giả sử token lưu ở đây
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }),
    };
  }

  // ✅ Lấy tất cả user (chỉ dành cho admin)
  getAllUsers() {
    return this.http.get<any[]>(
      `${this.api}/admin/users`,
      this.getAuthHeaders()
    );
  }

  // ✅ Tạo user mới (chỉ dành cho admin)
  createUser(user: any) {
    return this.http.post(
      `${this.api}/admin/users`,
      user,
      this.getAuthHeaders()
    );
  }

  // ✅ Xóa user (chỉ dành cho admin)
  deleteUser(id: number) {
    return this.http.delete(
      `${this.api}/admin/users/${id}`,
      this.getAuthHeaders()
    );
  }

  // ✅ Cập nhật quyền (role) cho user (chỉ cần là authenticated user)
  updateRole(userId: number, roleId: number) {
    return this.http.put(
      `${this.api}/users/${userId}/role`,
      { role: roleId },
      this.getAuthHeaders()
    );
  }

  // ✅ Lấy user hiện tại (đã đăng nhập)
  getCurrentUser() {
    return this.http.get(`${this.api}/user`, this.getAuthHeaders());
  }
}
