import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './app.state';
import { CreditCard } from './models/card-payment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  creditCardDetails: CreditCard;
  storeSubscription: Subscription;

  constructor(public router: Router, private store: Store<AppState>) {
    this.storeSubscription = this.store.select(state => state.creditCard).subscribe((payload:CreditCard)=> {
      this.creditCardDetails = payload
      console.log('object :>> ', payload);
    })
  }

  ngOnDestroy(){
    if(this.storeSubscription) this.storeSubscription.unsubscribe()
  }
}
