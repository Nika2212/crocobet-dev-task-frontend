import { Component, OnInit } from '@angular/core';
import { Growl } from '../../models/growl.model';
import { GrowlService } from '../../../core/services/growl.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'croco-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.scss']
})
export class GrowlComponent extends BaseComponent implements OnInit {
  public growlModel: Growl;
  public appearGrowl: boolean;

  private appearTimer: any;

  constructor(
    private growlService: GrowlService
  ) {
    super();
  }

  public ngOnInit(): void {
    const sub = this.growlService.listen()
      .subscribe(payload => {
        this.growlModel = payload;

        clearTimeout(this.appearTimer);

        const localTimer = setTimeout(() => {
          this.appearGrowl = !!this.growlModel;
          clearTimeout(localTimer);
        }, 20);

        this.appearTimer = setTimeout(() => {
          this.hideGrowl();
        }, 3000);
      });

    this.addSubscription(sub);
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public hideGrowl(): void {
    this.appearGrowl = false;
    this.growlService.forceDisappear();
  }

}
