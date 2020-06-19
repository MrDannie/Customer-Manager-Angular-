import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
 
 constructor() { }

 filter(filterBy: string, items: any[]){
  if(filterBy && items){
   let filteredList =  items.filter((customer) =>
   customer.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
   customer.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
   customer.city.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
   customer.state.name.toLocaleLowerCase().indexOf(filterBy) !== -1 
   )
 return filteredList
   }
return items
 }
}