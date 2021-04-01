import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService
  ) {}
  paymentAddForm: FormGroup;
  rental: Rental;
  dailyPrice: number;
  payment: Payment;
  amountOfPayment: number = 0;
  Date = new Date();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
      if (params['dailyPrice']) {
        this.dailyPrice = params['dailyPrice'];
        this.paymentCalculator();
      }
      this.createProductAddForm();
    });
  }
  createProductAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      expirationDat: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastr.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }
  pay() {
    let paymentModel = Object.assign({}, this.paymentAddForm.value);
    //this.payment={amount:10,creditCardNumber:"sdf",cvv:123,expirationDat:null}
    this.payment = {
      amount: this.amountOfPayment,
      creditCardNumber: paymentModel.creditCardNumber,
      cvv: Number(paymentModel.cvv),
      expirationDat: paymentModel.expirationDat,
    };
    console.log(this.payment);
    this.paymentService.pay(this.payment).subscribe(
      (response) => {
        this.rentalService.addToRental(this.rental).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['/cars']);
            this.toastr.success(response.message, 'İşlem Başarılı');
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
