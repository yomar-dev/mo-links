import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from 'src/app/constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token = '';
  private _userId = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const URL = `${API_URL}/login`;
    return this.http
      .post(
        URL,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(map((resp: any) => resp.token));
  }

  signup(name: string, email: string, password: string) {
    const URL = `${API_URL}/register`;
    return this.http
      .post(
        URL,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(map((resp: any) => resp.id));
  }

  getUser(id: string) {
    const URL = `${API_URL}/user/${id}`;
    return this.http
      .get<User>(URL, {
        headers: {
          'Content-Type': 'application/json',
          Token: `${this.token}`,
        },
      })
      .pipe(map((user: User) => user));
  }

  logout() {
    this._token = '';
    this._userId = '';
  }

  get isLoggedIn() {
    return this._token ? true : false;
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  get userId() {
    return this._userId;
  }

  set userId(id: string) {
    this._userId = id;
  }
}
