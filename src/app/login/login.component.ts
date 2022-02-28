import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../userservice.service';

@Component
({
  templateUrl: './login.component.html'
})
export class LoginComponent 
{
  credentials: { credentialsUsername: string, credentialsPassword: string };
  constructor(private userservice: UserService, private httpclient: HttpClient, private router: Router) 
  {
    this.credentials = {credentialsUsername: '', credentialsPassword: ''};
  }

  login()
  {
    this.userservice.authenticate(this.credentials, () => 
    {
      this.router.navigateByUrl('/');
    });
  }

}
