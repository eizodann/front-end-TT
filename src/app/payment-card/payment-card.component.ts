import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AppState } from '../app.state';
import { CreditCard } from '../models/card-payment.interface';
import { CardPaymentService } from '../services/card-payment.service';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent implements OnInit {
  cardDetailsForm: FormGroup;
  currentDate = new Date();
  cardPaymentServiceSub: Subscription;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private cardPaymentService: CardPaymentService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('currentDate :>> ', this.currentDate.toLocaleDateString('en-CA'));
    this.cardDetailsForm = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', [Validators.required, this.dateValidator]],
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.min(111),Validators.max(999)]],
      amount: ['', [Validators.required, this.amountValidator]],
    });
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  // securityCodeValidator(control: FormControl): { [s: string]: boolean } {
  //   if (control.value.trim().length < 3) {
  //     return { 'tooShort': true }
  //   }
  //   return null;
  // }

  amountValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value <= 0) {
      return { 'isZero': true }
    }
    return null;
  }

  onSubmit() {

    this.cardPaymentServiceSub = this.cardPaymentService.makePayment(this.cardDetailsForm.value).subscribe(res => {
      this.snackBar.open(res.message, 'Close', {
        duration: 5000,
      });
      this.store.dispatch({
        type: 'ADD_CARD',
        payload: <CreditCard>res.result
      });
    }, err => {
      this.snackBar.open('An error occured, try again later', 'Close', {
        duration: 5000,
      });
    })
  }

  ngOnDestroy() {
    if (this.cardPaymentServiceSub) this.cardPaymentServiceSub.unsubscribe()
  }
}
