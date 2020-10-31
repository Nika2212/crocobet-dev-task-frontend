import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../shared/models/base-response.model';
import { map } from 'rxjs/operators';

export class BaseService {
  private readonly URL: string;

  constructor(private http: HttpClient, controllerName: string) {
    this.URL = `${environment.api}${controllerName}/`;
  }

  protected get<T>(methodName: string): Observable<T> {
    return this.http.get<BaseResponse<T>>(this.URL + methodName)
      .pipe(map(payload => payload.Data));
  }

  protected post<T>(methodName: string, data: any): Observable<T> {
    return this.http.post<BaseResponse<T>>(this.URL + methodName, data)
      .pipe(map(payload => payload.Data));
  }

  protected put<T>(methodName: string, data: any): Observable<T> {
    return this.http.put<BaseResponse<T>>(this.URL + methodName, data)
      .pipe(map(payload => payload.Data));
  }

  protected delete<T>(methodName: string): Observable<any> {
    return this.http.delete<void>(this.URL + methodName);
  }
}
