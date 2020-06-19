import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  customers: ICustomer[];
  totalRecord = 0;
  pageSize = 5;
  constructor(private dataService: DataService,) { }

  ngOnInit() {

    this.getCustomersPage(1);
}

pageChanged(page: number) {
  this.getCustomersPage(page);
}

getCustomersPage(page: number){
  this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize * page)
      .subscribe(customers =>  {
        this.customers =  customers.results
        this.totalRecord = customers.totalRecord
      }
   )}

}
