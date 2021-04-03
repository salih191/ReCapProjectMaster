import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarAdd } from '../models/car-add';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarById(carId:number):Observable<ItemResponseModel<Car>>
  {
    let newPath = environment.apiUrl + 'cars/getbyidcardetails?carid='+carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getcarsdetailbybrandid?brandid=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getcarsdetailbycolorid?colorid=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorAndBrand(colorId: number,brandId:number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getcarsdetailbycoloridandbrandid?colorid=' + colorId+"&brandid="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  add(car:CarAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"cars/add",car)
  }
}
