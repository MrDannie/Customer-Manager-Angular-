import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
 selector: 'pagination-tab',
 templateUrl: './pagination.component.html',
 styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
pages: number[] = []
private pagerTotalItems: number;
private pagerPageSize: number;
isVisible: boolean;
totalPages: number;
currentPage: number = 1

@Input() get pageSize(): number {
 return this.pagerPageSize
}

set pageSize(value: number) {
 this.pagerPageSize = value
 this.update()
}

@Input() get totalItems(): number {
 return this.pagerTotalItems
}

set totalItems(value: number) {
 this.pagerTotalItems = value

 this.update()
}

@Output() pageChanged: EventEmitter<any> = new EventEmitter();

constructor() { }



 ngOnInit() { 

 }

 changePage(page: number, event?: MouseEvent){
  if (event) {
   event.preventDefault();
 }
 if (this.currentPage === page) { return; }
 this.currentPage = page;
 this.pageChanged.emit(page);
}

update() {

  if (this.pagerTotalItems && this.pagerPageSize) {

    this.totalPages = Math.ceil(this.pagerTotalItems / this.pageSize);

    if (this.totalItems >= this.pageSize) {
      for (let i = 1; i < this.totalPages + 1; i++) {
        this.pages.push(i);
      }
    }
    return;
  }

  this.isVisible = false;
}

changeToAnotherPage(direction: number, event?: MouseEvent) {
  let page: number = this.currentPage;
  if (direction === -1) {
      if (page > 1) { page--; }
  } else {
      if (page < this.totalPages) { page++; }
  }
  this.changePage(page, event);
}

 }

 

