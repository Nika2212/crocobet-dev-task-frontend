import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenService } from '../services/access-token.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(public accessTokenService: AccessTokenService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.accessTokenService.getJWTToken()}`
      }
    });

    return next.handle(request);
  }
}
