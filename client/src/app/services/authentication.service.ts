import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

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
}
