import { Component } from '@angular/core';
import { UserService } from '../userservice.service';

@Component
({
  templateUrl: './home.component.html',
})
export class HomeComponent 
{
  title = 'Spring Boot Angular';
  constructor(private userservice: UserService)
  {}

  authenticated()
  {
    return this.userservice.getAuthenticated();
  }
}
