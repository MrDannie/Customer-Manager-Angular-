import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CustomersCardComponent } from './customers-card/customers-card.component';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../shared/shared.module';
import { CustomersGridComponent } from './customers-grid/customers-grid.component';
import { CustomersRoutingModule } from './customers-routing.module';


@NgModule({
 imports: [ CommonModule, SharedModule, CustomersRoutingModule ],
 declarations: [  CustomersCardComponent, CustomersComponent, CustomersGridComponent ],
 exports: [ CustomersComponent, CustomersCardComponent, CustomersGridComponent ]
})
export class CustomersModule { }