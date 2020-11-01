import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http, 'Users');
  }

  public getAllUsers(): Observable<User[]> {
    return this.get('Get');
  }
}
