import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UserService 
{
  private ROOTURL: string = "http://hireme.us-east-1.elasticbeanstalk.com";
  private authenticated: boolean = false;
  private getCredentialsUrl: string = this.ROOTURL + "/user";
  private getLoggedInUsernameUrl: string = "/getusername";
  private registerUserUrl: string = this.ROOTURL + "/register";
  private isUsernameTakenUrl: string = this.ROOTURL + "/isusernametaken";
  private isEmailTakenUrl: string = this.ROOTURL + "/isusernametaken";
  private logoutUrl: string = this.ROOTURL + "/logout";

  private loggedInUsername: ReplaySubject<String> = new ReplaySubject<String>();

  constructor(private http: HttpClient) 
  {}

  authenticate(credentials?: {credentialsUsername: String, credentialsPassword: String}, callback?: any)
  {
    if (credentials)
    {
      var username = credentials.credentialsUsername;
    }
    const headers = new HttpHeaders(credentials ? 
      {
        authorization: 'Basic ' + btoa(credentials.credentialsUsername + ':' + credentials.credentialsPassword)
      } : {});

      this.http.get(this.getCredentialsUrl, {headers: headers}).subscribe(response =>
      {
          if (response)  
          {
            this.authenticated = true;
            this.loggedInUsername.next(username);
          } 
          else
          {
            this.authenticated = false;
            this.loggedInUsername.next("");
          }
          return callback && callback();
      });
  }

  getLoggedInUsername(): ReplaySubject<String>
  {
    return this.loggedInUsername;
  }

  getAuthenticated(): boolean
  {
    return this.authenticated;
  }

  logout()
  {
    this.http.post(this.logoutUrl, null);
    this.loggedInUsername.next("");
    this.authenticated = false;
  }

  register(user: {username: string, password: string, email: string}): Observable<boolean>
  {
    return this.http.post<boolean>(this.registerUserUrl, user);
  }

  isUsernameTaken(username: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.isUsernameTakenUrl, username);
  }

  isEmailTaken(email: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.isEmailTakenUrl, email);
  }
}


