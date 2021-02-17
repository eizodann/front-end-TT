import { CreditCard } from '../models/card-payment.interface';
import { Action } from '@ngrx/store';
export const ADD_CARD = 'ADD_CARD';

let initialCreditCardDet: CreditCard = {
    creditCardNumber: "N/A",
    cardHolder: "N/A",
    expirationDate: "N/A",
    securityCode: "N/A",
    amount: 0
}

export function addCreditCardReducer(state: CreditCard = initialCreditCardDet, action) {
    switch (action.type) {
        case ADD_CARD:
            return action.payload;
        default:
            return state;
    }
}