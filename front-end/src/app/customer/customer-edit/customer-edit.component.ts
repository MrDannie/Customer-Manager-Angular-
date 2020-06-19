import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { DataService } from "src/app/core/services/data.service";
import { ICustomer, IState } from "src/app/shared/interfaces";
import { ModalService, IModalContent } from "../../core/modal/modal.service";
import {
  GrowlerService,
  GrowlerMessageType
} from "../../core/growler/growler.service";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.css"]
})
export class CustomerEditComponent implements OnInit {
  deleteMessageEnabled: boolean;

  customer: ICustomer = {
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    city: "",
    state: {
      abbreviation: "",
      name: ""
    }
  };

  operationText: string = "Insert";
  states: IState[];
  @ViewChild("customerForm", { static: true }) customerForm: NgForm;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService,
    private growler: GrowlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params["id"];
      if (id !== 0) {
        this.operationText = "Update";
        this.getCustomer(id);
      }
    });
    this.dataService.getStates().subscribe((states: IState[]) => {
      this.states = states;
    });
  }

  getCustomer(id: number) {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  submit() {
    if (this.customer.id === 0) {
      this.dataService.insertCustomer(this.customer).subscribe(
        (insertedCustomer: ICustomer) => {
          if (insertedCustomer) {
            this.customerForm.form.markAsPristine();
            const popMsg = "Customer Inserted Successfully";
            this.growler.growl(popMsg, GrowlerMessageType.Success);
            this.router.navigate(["/customers"]);
          } else {
            const msg = "Unable to insert customer";
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
        (err: any) => console.log(err)
      );
    } else {
      this.dataService.updateCustomer(this.customer).subscribe(
        (updatedCustomer: ICustomer) => {
          if (updatedCustomer) {
            this.customerForm.form.markAsPristine();
            this.growler.growl(
              "Customer Updated Successfully!",
              GrowlerMessageType.Success
            );
          } else {
            const msg = "Unable to update customer";
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
        (err: any) => console.log(err)
      );
    }
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id).subscribe(
      (status: boolean) => {
        if (status) {
          this.growler.growl(
            "Customer Deleted Successfully",
            GrowlerMessageType.Success
          );

          this.router.navigate(["/customer"]);
        } else {
          this.errorMessage = "Unable to delete customer";
          this.growler.growl(
            "Unable to delete customer",
            GrowlerMessageType.Danger
          );
        }
      },
      (err: any) => console.log(err)
    );
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(["/customers"]);
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.customerForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: "Lose Unsaved Changes?",
      body:
        "You have unsaved changes! Would you like to leave the page and lose them?",
      cancelButtonText: "Cancel",
      OKButtonText: "Leave"
    };
    return this.modalService.show(modalContent);
  }
}
