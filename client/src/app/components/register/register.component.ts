import { Component, OnInit } from '@angular/core';

import { ValidateService } from "../../services/validate.service";

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

  constructor(private _validateService: ValidateService) { }

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
      console.log("please fill in all fields");
      return false;
    }

    if (!this._validateService.validteEmail(user.email)) {
      console.log("please use a valid email");
      return false;
    }
  }
}
