import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInClientServiceService 
{
  private currentLoggedInClient: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor() { }

  setLoggedInClient(clientId: number)
  {
    this.currentLoggedInClient.next(clientId);
  }

  getCurrentLoggedInClient(): BehaviorSubject<number>
  {
    return this.currentLoggedInClient;
  }
}
