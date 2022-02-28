import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IsAnimationDoneServiceComponent
{
  private isAnimationDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setAnimationDone(isAnimationDone: boolean)
  {
    this.isAnimationDone.next(isAnimationDone);
  }

  getAnimationDone(): BehaviorSubject<boolean>
  {
    return this.isAnimationDone;
  }

  

}
