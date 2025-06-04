import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthservicesService {
  private baseUrl = 'http://laravel-note-app/api';
  accessToken: any;
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

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logoutAndRedirect() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
