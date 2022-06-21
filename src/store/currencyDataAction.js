import { currencyDataSliceActions } from "./currencyData-slice";
import axios from "axios";
import {
  CoinList,
  HistoricalChart,
  SingleCoin,
  TrendingCoins,
} from "../config/api";

export const fetchTrendingCoins = (currency) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(TrendingCoins(currency));
      return response.data;
    };
    try {
      const data = await getData();
      dispatch(currencyDataSliceActions.getTrendingCurrencyData(data));
    } catch (error) {
      console.log("fetching failed");
    }
  };
};

export const fetchCoins = (currency) => {
  return async (dispatch) => {
    const getCoins = async () => {
      const response = await axios.get(CoinList(currency));
      return response.data;
    };
    try {
      const coins = await getCoins();
      dispatch(currencyDataSliceActions.getCoins(coins));
    } catch (error) {
      console.log("fetching failed");
    }
  };
};

export const fetchCoin = (id) => {
  return async (dispatch) => {
    const getCoin = async () => {
      const response = await axios.get(SingleCoin(id));
      return response.data;
    };
    try {
      const coin = await getCoin();
      dispatch(currencyDataSliceActions.getSingleCoin(coin));
    } catch (error) {
      console.log("fetching failed");
    }
  };
};
export const fetchChartData = (id, days, currency) => {
  return async (dispatch) => {
    const getChartData = async () => {
      const response = await axios.get(HistoricalChart(id, days, currency));
      return response.data;
    };
    try {
      const chartData = await getChartData();
      dispatch(currencyDataSliceActions.getChartData(chartData));
    } catch (error) {
      console.log("fetching failed");
    }
  };
};
