import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Registration } from '../../shared/models/registration.model';
import { Authorization } from '../../shared/models/authorization.model';
import { Authorized } from '../../shared/models/authorized.model';
import { User } from '../../shared/models/user.model';

@Injectable()
export class AuthService extends BaseService {
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    http: HttpClient
  ) {
    super(http, 'Auth');
  }

  public setCurrentUser(user: User): void {
    this.currentUser.next(user);
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public register(model: Registration): Observable<Authorized> {
    return this.post<Authorized>('Register', model);
  }

  public login(model: Authorization): Observable<Authorized> {
    return this.post<Authorized>('Authorize', model);
  }

  public checkUser(username: string): Observable<boolean> {
    return this.post<boolean>('CheckUsername', {Username: username});
  }

  public ping(): Observable<User> {
    return this.get('Ping');
  }
}
