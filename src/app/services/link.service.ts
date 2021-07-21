import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { API_URL } from 'src/app/constants';
import { Link } from '../models/link.model';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createLink(url: string, name: string) {
    const URL = `${API_URL}/links`;
    return this.http
      .post<Link>(
        URL,
        {
          url: url,
          name: name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: `${this.authService.token}`,
          },
        }
      )
      .pipe(map((link: Link) => link));
  }

  getLinks() {
    const URL = `${API_URL}/links`;
    return this.http
      .get<Link[]>(URL, {
        headers: {
          'Content-Type': 'application/json',
          Token: `${this.authService.token}`,
        },
      })
      .pipe(map((links: Link[]) => links));
  }

  deleteLink(id: string) {
    const URL = `${API_URL}/links/${id}`;
    return this.http
      .delete<Link>(URL, {
        headers: {
          'Content-Type': 'application/json',
          Token: `${this.authService.token}`,
        },
      })
      .pipe(map((link: Link) => link));
  }
}
