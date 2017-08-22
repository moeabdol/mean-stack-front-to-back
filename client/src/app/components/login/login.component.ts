import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this._authenticationService.authenticateUser(user)
      .subscribe(
        data => {
          this._authenticationService.storeUserData(data);
          this._flashMessagesService.show("You are logged in!", {
            cssClass: "alert-success",
            timeout: 5000
          });
          this._router.navigate(["/dashboard"]);
        },
        err => {
          this._flashMessagesService.show(JSON.parse(err._body).message, {
            cssClass: "alert-danger",
            timeout: 5000
          });
        }
      );
  }
}
