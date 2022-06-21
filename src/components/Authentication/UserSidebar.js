import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from "firebase/firestore";
import { uiActions } from "../../store/ui-slice";


export default function SideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const user = useSelector((state) => state.user.user);
  const coins = useSelector((state) => state.currencyData.coins);
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const symbol = useSelector((state) => state.currency.symbol);
  const ui = useSelector((state) => state.ui.alert);
  const dispatch = useDispatch();


  const removeFromWatchList = async(coin) => {
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



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };




  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, display: 'flex', flexDirection: 'column',  height: '100vh', padding: '10px'  }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          flex: 1,
          
      }}
      >
        <Avatar
          sx={{
            height: "160px",
            width: "160px",
            marginLeft: "15px",
            cursor: "pointer",
            backgroundColor: "gold",

          }}
          src={user.photoURL}
          alt={user.displayName || user.email}
        />
        <span>{user.displayName || user.email}</span>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            backgroundColor: 'gray',
            borderRadius: '10px',
            padding: '15px',
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            overflow: 'scroll',
            marginBottom: '10px'
        }}
        >
          <Typography> Watchlist</Typography>
          {
            coins.map((coin) => {
              if (watchlist.includes(coin.id)) {
                return (
                  <Box sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: "#EEBC1D", padding: "5px 10px", gap: "5px", borderRadius: "5px", boxShadow: "0 0 5px rgba(0,0,0,0.4)",color: "#000"}}>
                    <span>{coin.name}</span>
                    <span style={{display:'flex', gap: '8px'}}>
                      {symbol}
                      {numberWithCommas(coin.current_price.toFixed(2))}
                      <DeleteIcon style={{ cursor: 'pointer' }} onClick={()=> removeFromWatchList(coin)} />
                    </span>
                  </Box>
                )
              }
            })
          }
        </Box>
      </Box>
      <Button
        sx={{
          backgroundColor: 'gold',
          color: '#fff',
        }}
        onClick={logOut}
      >Logout</Button>
    </Box>
  );


  const logOut = () => {
    signOut(auth);
  }

  

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: "38px",
              width: "38px",
              marginLeft: "15px",
              cursor: "pointer",
              backgroundColor: "gold",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
