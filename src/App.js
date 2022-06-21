import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./components/Pages/CoinPage";
import Header from "./components/Header";
import HomePage from "./components/Pages/HomePage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/Theme";
import "./App.css";
import AppAlert from "./components/Alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "./store/user-slice";
import { doc, onSnapshot } from "firebase/firestore";
import { watchlistActions } from "./store/watchlist-slice";
import { uiActions } from "./store/ui-slice";

function App() {

  const user = useSelector((state) => state.user.user);
  const ui = useSelector((state) => state.ui.alert);

  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          console.log(coin.data().coins)
          dispatch(watchlistActions.getWatchlist(coin.data().coins))
        } else {
          console.log("No coins in Watchlist")
        }
      })
      return () => {
        unsubscribe();
  }
    }
    

},[user])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          dispatch(userSliceActions.setUser(user))
      } else {
        dispatch(userSliceActions.setUser(null))
        }
      })
  }, [])

 
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div style={{backgroundColor: '#000', minHeight: '100vh'}}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
        <AppAlert />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
