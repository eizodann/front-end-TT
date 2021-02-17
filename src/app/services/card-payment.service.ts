import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardPaymentService {
  constructor() { }

  makePayment(result): Observable<any> {
    const response = {
      status: 'success',
      message: 'card added successfully, go back HOME to view card details',
      result
    };
    return of(new HttpResponse({ status: 200, body: response })).pipe(map(data => {
      return data.body
    }));
  }
}
