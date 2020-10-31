import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Growl } from '../../shared/models/growl.model';
import { GrowlType } from '../enums/growl-type';

@Injectable()
export class GrowlService {
  private activeGrowl: BehaviorSubject<Growl> = new BehaviorSubject<Growl>(null);

  public appear(type: GrowlType, message: string): void {
    const newGrowl = new Growl();
    newGrowl.type = type;
    newGrowl.message = message;

    this.activeGrowl.next(newGrowl);
  }

  public forceDisappear(): void {
    this.activeGrowl.next(null);
  }

  public listen(): Observable<Growl> {
    return this.activeGrowl;
  }
}
