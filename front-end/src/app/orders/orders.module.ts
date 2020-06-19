import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ SharedModule, OrdersRoutingModule, CommonModule],
  declarations: [ OrdersRoutingModule.components ]
})
export class OrdersModule { }