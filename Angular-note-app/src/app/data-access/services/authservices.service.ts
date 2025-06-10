import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthservicesService {
  private baseUrl = 'http://laravel-note-app/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      }
    );
  }

  saveToken(response: any) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user_role', response.user.role);
  }

  getToken() {
    return localStorage.getItem('access_token') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logoutAndRedirect() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
