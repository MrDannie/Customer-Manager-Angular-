import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "filter-textbox",
  template: `
    Filter: <br />
    <input type="text" [(ngModel)]="listFilter" />
  `,
  styles: []
})
export class FilterTextboxComponent implements OnInit {
  private _listFilter: string = "";

  @Input() get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value) {
    this._listFilter = value;
    this.filterAction.emit(this._listFilter);
  }

  @Output() filterAction: EventEmitter<string> = new EventEmitter();

  constructor() {}
  ngOnInit() {}
}
