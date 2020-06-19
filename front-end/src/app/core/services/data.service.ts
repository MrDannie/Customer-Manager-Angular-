import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError, filter, tap } from "rxjs/operators";

import {
  ICustomer,
  IPagedResults,
  IState,
  IApiResponse,
  ICustomerResponse,
} from "src/app/shared/interfaces";

@Injectable()
export class DataService {
  stateUrl: string = "http://localhost:5000/api/states";
  customerBaseUrl: string = "http://localhost:5000/api/customers";

  constructor(private http: HttpClient) {}

  getCustomersPage(
    page: number,
    pageSize: number
  ): Observable<IPagedResults<ICustomer[]>> {
    return this.http
      .get<ICustomer[]>(`api/customers/page/${page}/${pageSize}`, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          const totalRecords = +response.headers.get("X-InlineCount");
          let customers = response.body as ICustomer[];
          this.calculateCustomersOrderTotal(customers);
          return {
            results: customers,
            totalRecord: totalRecords,
          };
        }),
        catchError(this.handleError)
      );
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>("api/customers" + "/" + id).pipe(
      map((customer) => {
        this.calculateCustomersOrderTotal([customer]);
        return customer;
      }),
      catchError(this.handleError)
    );
  }

  insertCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomerResponse>("api/customers", customer).pipe(
      map((data) => data.customer),
      catchError(this.handleError)
    );
  }

  updateCustomer(updatedCustomer: ICustomer): Observable<ICustomer> {
    return this.http
      .put<ICustomerResponse>(
        "api/customers" + "/" + updatedCustomer.id,
        updatedCustomer
      )
      .pipe(
        map((data) => data.customer),
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<IApiResponse>("api/customers" + "/" + id).pipe(
      map((res) => res.status),
      catchError(this.handleError)
    );
  }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>("api/states").pipe(
      map((response) => {
        const states = response["states"];
        return states;
      }),
      catchError(this.handleError)
    );
  }

  calculateCustomersOrderTotal(customers: ICustomer[]) {
    for (const customer of customers) {
      if (customer && customer.orders) {
        let total = 0;
        for (const order of customer.orders) {
          total += order.itemCost;
        }
        customer.orderTotal = total;
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error("server error:", error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || "Node.js server error");
  }
}
