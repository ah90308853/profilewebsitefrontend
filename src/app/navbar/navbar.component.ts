import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { IsAnimationDoneServiceComponent } from '../is-animation-done-service/is-animation-done-service.component';
import { ScrollServiceComponent } from '../scroll-service/scroll-service.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  private animationDone: boolean = false;

  constructor(private scrollService: ScrollServiceComponent, private isAnimationDoneService: IsAnimationDoneServiceComponent) 
  {
    this.isAnimationDoneService.getAnimationDone().subscribe(
      (response) => 
      {
        this.animationDone = response;
      }
    );
  }

  isLinkActive(sectionIndex: number): boolean
  {
    return this.scrollService.getSectionLinkState(sectionIndex);
  }
  
  getAnimationDone(): boolean
  {
    return this.animationDone;
  }

}
