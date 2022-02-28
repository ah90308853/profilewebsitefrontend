import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { UniqueEmailValidator } from '../unique-email-validator';
import { UniqueUsernameValidator } from '../unique-username-validator';
import { UserService } from '../userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent
{
  private loggedInUsername: String = "";
  private registrationOutcome?: boolean = undefined;
  private usernameSyncValidators = 
  [
    Validators.pattern("^[\\S]{5,20}$"),
    Validators.required
  ];
  private passwordSyncValidators =
  [
    Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&-+=()])(?=\\S+$).{8,20}$"),
    Validators.required
  ]
  private emailSyncValidators =
  [
    Validators.pattern("^(?=.*[@]+)(?=.*[.]+).{5,50}$"),
    Validators.required
  ];
  private userForm = this.fb.group
  (
    {
      username: new FormControl(null, {validators: this.usernameSyncValidators, asyncValidators: UniqueUsernameValidator.createValidator(this.userservice), updateOn: 'change'}),
      password: new FormControl(null, {validators: this.passwordSyncValidators, updateOn: 'change'}),
      email: new FormControl(null, {validators: this.emailSyncValidators, asyncValidators: UniqueEmailValidator.createValidator(this.userservice), updateOn: 'change'})
    }
  )

  private loginForm = this.fb.group
  (
    {
      credentialsUsername: new FormControl(null, Validators.required),
      credentialsPassword: new FormControl(null, Validators.required)
    }
  )

  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router) 
  {
    this.subscribeToUsername();
  }

  register()
  {
    this.userservice.register(this.userForm.value).subscribe(
      response => this.registrationOutcome = response
    );
    this.userForm.reset();
  }

  login()
  {
    this.userservice.authenticate(this.loginForm.value);
    this.loginForm.reset();
  }

  logout()
  {
    this.userservice.logout();
    this.loggedInUsername = "";
  }

  authenticated()
  {
    return this.userservice.getAuthenticated();
  }

  getUserFormField(fieldName: string)
  {
    return this.userForm.get(fieldName) as FormControl;
  }

  getLoginFormField(fieldName: string)
  {
    return this.loginForm.get(fieldName) as FormControl;
  }

  subscribeToUsername()
  {
    this.userservice.getLoggedInUsername().subscribe((response) => { this.loggedInUsername = response; });
  }

  getUserForm(): FormGroup
  {
    return this.userForm;
  }

  getLoginForm(): FormGroup
  {
    return this.loginForm;
  }

  getLoggedInUsername(): String
  {
    return this.loggedInUsername;
  }

  getRegistrationOutcome(): boolean | undefined
  {
    return this.registrationOutcome;
  }

  getRegistrationOutcomeMessage(): String
  {
    if (this.registrationOutcome)
    {
      return "Registration successful. Welcome!";
    }
    else
    {
      return "Registration failed. Please try again!";
    }
  }


}
