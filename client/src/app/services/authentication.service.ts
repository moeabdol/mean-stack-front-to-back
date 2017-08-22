import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this._http.post("http://localhost:3000/users/register", user,
      { headers: headers }).map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this._http.post("http://localhost:3000/users/authenticate", user,
      { headers: headers }).map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this._http.get("http://localhost:3000/users/profile",
      { headers: headers }).map(res => res.json());
  }

  storeUserData(data) {
    localStorage.setItem("id_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    this.authToken = data.token;
    this.user = data.user;
  }

  loadToken() {
    this.authToken = localStorage.getItem("id_token");
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
