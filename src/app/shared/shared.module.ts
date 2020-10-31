import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpirationCalculatorPipe } from './pipes/expiration-calculator.pipe';

@NgModule({
  declarations: [ExpirationCalculatorPipe],
  imports: [
    CommonModule
  ],
  exports: [ExpirationCalculatorPipe]
})
export class SharedModule { }
