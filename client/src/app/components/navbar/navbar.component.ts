import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this._authenticationService.logout();
    this._flashMessages.show("You are logged out", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this._router.navigate(["/login"]);
    return false;
  }
}
