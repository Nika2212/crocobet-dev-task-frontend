import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowlComponent } from './growl.component';

@NgModule({
  declarations: [GrowlComponent],
  exports: [
    GrowlComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GrowlModule { }
