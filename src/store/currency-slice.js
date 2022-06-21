import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
    name: 'CurrencySlice',
    initialState: {
        currency: 'INR',
        symbol: "₹"
    },
    reducers: {
        changeCurrency(state, action) {
            const newCurrency = action.payload;
            state.currency = newCurrency;
            if (action.payload === 'INR') {
                state.symbol = '₹'
            } else {
                state.symbol = '$'
            }
        }
    }
});

export const currencyActions = currencySlice.actions;
export default currencySlice;