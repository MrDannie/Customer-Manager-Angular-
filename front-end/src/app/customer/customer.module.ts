import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
 imports: [ CommonModule, SharedModule, CustomerRoutingModule ],
 declarations: [CustomerRoutingModule.components],
 exports: [ CustomerComponent, CustomerDetailsComponent ]
})
export class CustomerModule { }