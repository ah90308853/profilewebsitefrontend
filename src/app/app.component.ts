import { Component } from '@angular/core';
import { UserService } from './userservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ScrollServiceComponent } from './scroll-service/scroll-service.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  private currentSection: string = "welcome";

  constructor(private userservice: UserService, private http: HttpClient, private scrollService: ScrollServiceComponent, location: Location)
  {
    scrollService.currentSection.subscribe(
      (response) => 
      {
        if (this.currentSection != response)
        {
          this.currentSection = response;
          location.go("/#" + this.currentSection);
        }
        console.log("current section: " + response);
      }
    );
    this.userservice.authenticate(undefined, undefined);
  }
}
