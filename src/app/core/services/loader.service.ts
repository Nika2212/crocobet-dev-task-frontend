import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public startLoader(): void {
    this.loaderState.next(true);
  }

  public stopLoader(): void {
    this.loaderState.next(false);
  }

  public getLoaderState(): Observable<boolean> {
    return this.loaderState;
  }
}
