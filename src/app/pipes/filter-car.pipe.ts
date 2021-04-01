import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: Car[], filterText:string): Car[] {
    filterText= filterText?filterText.toLowerCase():""
    return filterText?value.filter(c=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
