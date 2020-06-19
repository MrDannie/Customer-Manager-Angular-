import { Component, OnInit } from "@angular/core";
import { ICustomer } from "src/app/shared/interfaces";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.css"]
})
export class CustomerDetailsComponent implements OnInit {
  customer: ICustomer;
  mapEnabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params["id"];
      if (id) {
        this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
          this.customer = customer;
          this.mapEnabled = true;
        });
      }
    });
  }
}
