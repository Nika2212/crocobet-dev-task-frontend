import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccessTokenService } from '../services/access-token.service';
import { BaseResponse } from '../../shared/models/base-response.model';
import { GrowlService } from '../services/growl.service';
import { GrowlType } from '../enums/growl-type';
import { getErrorMessage } from '../utils/error-codes';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private accessTokenService: AccessTokenService,
    private router: Router,
    private growlService: GrowlService,
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((event: HttpResponse<any>) => {
          if (event instanceof HttpResponse) {
            const body = event.body as BaseResponse<unknown>;
            if (!body.IsSuccess) {
              const message = getErrorMessage(body.ErrorCode);
              this.loaderService.stopLoader();
              this.growlService.appear(GrowlType.ERROR, message);
            }
          }

          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.accessTokenService.clearStorage();
            this.loaderService.stopLoader();
            this.router.navigate(['auth']);
          } else {
            return throwError(error.message);
          }
        })
      );
  }
}
