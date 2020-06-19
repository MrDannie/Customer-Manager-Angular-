import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { FilterTextboxComponent } from './filter-textbox.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapPointComponent } from './map/mapPoint.component';
import { RouterModule } from '@angular/router';
import { MapModule } from './map/map.module';

@NgModule({
 imports: [ CommonModule, FormsModule, RouterModule, MapModule ],
 declarations: [ FilterTextboxComponent, CapitalizePipe, TrimPipe, PaginationComponent ],
 exports: [ FilterTextboxComponent, RouterModule, CapitalizePipe, TrimPipe, PaginationComponent, MapComponent, MapPointComponent, FormsModule, CommonModule ]
})
export class SharedModule { }