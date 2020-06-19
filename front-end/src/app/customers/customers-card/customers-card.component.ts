import { Component, OnInit, Input } from '@angular/core';

import { ICustomer } from 'src/app/shared/interfaces';

@Component({
  selector: 'customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.css']
})
export class CustomersCardComponent implements OnInit {
@Input() customers: ICustomer[] = []
  constructor() { }

  ngOnInit() {
  }

}
