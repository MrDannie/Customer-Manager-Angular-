import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ICustomer } from 'src/app/shared/interfaces';

@Component({ 
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html'
})
export class CustomerOrderComponent implements OnInit {
  customer: ICustomer;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
            this.customer = customer;
       });
      }
    });
  }

}
