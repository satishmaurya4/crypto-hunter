import { styled } from "@mui/material/styles";
import { Button, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoin } from "../../store/currencyDataAction";
import CoinInfo from "../CoinInfo";
import ReactHtmlParser from "html-react-parser";
import { numberWithCommas } from "../Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uiActions } from "../../store/ui-slice";

const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Responsive1 = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderRight: "none",
  },
}));
const Responsive2 = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: 'flex',
    // justifyContent: "space-around",
    flexDirection: 'column',
      alignItems: 'start'
  },
  // [theme.breakpoints.down("sm")]: {
  //   flexDirection: 'column',
  // },
}));





const CoinPage = () => {
  const { id } = useParams();
  const coin = useSelector((state) => state.currencyData.singleCoin);
  const user = useSelector(state => state.user.user);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const inWatchlist = watchlist.includes(coin?.id);


  const addToWatchList = async() => {
    const coinRef = doc(db, "watchlist", user.uid);
  
    try {
      await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin.id] : [coin?.id] });
      dispatch(uiActions.alert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: 'success'
      }))
    } catch (error) {
      dispatch(uiActions.alert({
        open: true,
        message: error.message,
        type: 'error'
      }))
    }
  }

  const removeFromWatchList = async() => {
    const coinRef = doc(db, "watchlist", user.uid);
  
    try {
      await setDoc(coinRef, { coins: watchlist.filter(watch => watch !== coin?.id) }, 
        { merger: "true" });
      dispatch(uiActions.alert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: 'success'
      }))
    } catch (error) {
      dispatch(uiActions.alert({
        open: true,
        message: error.message,
        type: 'error'
      }))
    }
  }


  useEffect(() => {
    dispatch(fetchCoin(id));
  }, [dispatch, id]);
  

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
console.log("coin page rendered")
  return (
    <Responsive
      sx={{
        display: "flex",
      }}
    >
      <Responsive1
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: "20px" }}
        />
        <Typography variant="h3" sx={{ color: "#fff" }}>
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", width: "90%", textAlign: "justify" }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <Responsive2
          sx={{
            width: "100%",
            padding: "25px",
          }}
        >
          <span style={{ display: "flex", gap: "5px",  }}>
            <Typography varaint="h5" sx={{ color: "#fff" }}>
              Rank:
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex", gap: "5px" }}>
            <Typography varaint="h5" sx={{ color: "#fff" }}>
              Current Price:{" "}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>
              {currency.symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", gap: "5px" }}>
            <Typography varaint="h5" sx={{ color: "#fff" }}>
              Market Cap:{" "}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fff" }}>
              {currency.symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </span>
          {
            user && (
              <Button variant="outlined" style={{backgroundColor: inWatchlist ? "tomato":  '#EEBC1D',}} sx={{  height: '40px', color: '#000', outline: 'none' }}
              onClick={inWatchlist ? removeFromWatchList : addToWatchList}
              >{inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}</Button>

            )
          }
        </Responsive2>
      </Responsive1>
      {/*chart */}
      <CoinInfo coin={coin} />
    </Responsive>
  );
};

export default CoinPage;
