import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login = (username: string, password: string): Observable<string> => {
    return this.http.post<string>('http://localhost:3000/api/auth', {username: username, password: password});
  }

  public removeToken = () => {
    localStorage.removeItem('access_token');
  }
}
