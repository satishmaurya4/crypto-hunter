import { createSlice } from "@reduxjs/toolkit";

const currencyDataSlice = createSlice({
  name: "CryptoCurrencyData",
  initialState: {
    trendingCurrency: [],
    coins: [],
    singleCoin: null,
    chartData: {},
  },
  reducers: {
    getTrendingCurrencyData(state, action) {
      state.trendingCurrency = action.payload;
    },
    getCoins(state, action) {
      state.coins = action.payload;
    },
    getSingleCoin(state, action) {
      state.singleCoin = action.payload;
    },
    getChartData(state, action) {
      state.chartData = action.payload;
    },
  },
});

export const currencyDataSliceActions = currencyDataSlice.actions;
export default currencyDataSlice;
