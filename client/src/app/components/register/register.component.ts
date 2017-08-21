import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private _validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private _authenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this._validateService.validateRegister(user)) {
      this._flashMessagesService.show("please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    if (!this._validateService.validteEmail(user.email)) {
      this._flashMessagesService.show("please use a valid email", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    this._authenticationService.registerUser(user)
      .subscribe(
        data => {
          this._flashMessagesService.show("You have registered successfully!",
            {
              cssClass: "alert-success",
              timeout: 3000
            });
          this._router.navigate(["/login"]);
        },
        err => {
          this._flashMessagesService.show("Something went wrong!",
            {
              cssClass: "alert-danger",
              timeout: 3000
            });
          this._router.navigate(["/register"]);
        }
      );
  }
}
