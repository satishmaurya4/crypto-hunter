import { configureStore } from "@reduxjs/toolkit";
import currencyDataSlice from "./currencyData-slice";
import currencySlice from "./currency-slice";
import loadingSlice from "./loading-slice";
import userSlice from "./user-slice";
import uiSlice from "./ui-slice";
import watchlistSlice from "./watchlist-slice";

export const store = configureStore({
    reducer: {
        currency: currencySlice.reducer,
        currencyData: currencyDataSlice.reducer,
        loading: loadingSlice.reducer,
        user: userSlice.reducer,
        ui: uiSlice.reducer,
        watchlist: watchlistSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})