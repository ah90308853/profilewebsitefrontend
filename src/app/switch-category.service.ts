import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchCategoryService 
{
  categorySwitchStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() 
  {
    this.categorySwitchStatus.next(true);
  }

  switchCategory()
  {
    this.categorySwitchStatus.next(!this.categorySwitchStatus.value);
  }

  reset()
  {
    this.categorySwitchStatus.next(true);
  }

  getCategorySwitchStatus(): BehaviorSubject<boolean>
  {
    return this.categorySwitchStatus;
  }
}
