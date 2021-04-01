import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';

import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[];
  car: Car;
  rental: Rental;
  rentDate = new Date();
  returnDate: Date;
  suitable = false;
  imageBasePath = environment.baseUrl;
  dataLoaded = false;
  
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
      this.carImageService.getCarImages(carId).subscribe((response) => {
        this.carImages = response.data;
      });
    });
  }
  controlRental() {
    this.rental = {
      carId: this.car.carId,
      customerId: 3,
      id: 0,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.rentalService.controlRental(this.rental).subscribe(
      (response) => {
        this.suitable = response.success;
        this.router.navigate(['payment/pay/',JSON.stringify(this.rental),this.car.dailyPrice]);
        if (!response.success)
          this.toastrService.error(response.message, 'HATA');
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'HATA');
      }
    );
    
  }
}
