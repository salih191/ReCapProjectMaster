import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>
  {
    let newPath=environment.apiUrl+"rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }
  addToRental(rental:Rental):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"rentals/add", {rental}.rental)
  }
  controlRental(rental:Rental):Observable<ResponseModel>
  {
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"rentals/carcontrol", {rental}.rental)
  }
  
}
