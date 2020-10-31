import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'croco-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends BaseComponent implements OnInit, OnDestroy {
  public isLoading: boolean;

  constructor(
    private loaderService: LoaderService
  ) {
    super();
  }

  public ngOnInit(): void {
    const sub = this.loaderService.getLoaderState()
      .subscribe(payload => this.isLoading = payload);
    this.addSubscription(sub);
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

}
