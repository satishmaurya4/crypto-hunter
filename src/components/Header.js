import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Select from "@mui/material/Select";
import { Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { darkTheme } from "../Theme/Theme";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "../store/currency-slice";
import { fetchTrendingCoins } from "../store/currencyDataAction";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./Authentication/UserSidebar";

const Header = () => {
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency.currency);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("user", user);
  const currencyChangeHandler = (e) => {
    dispatch(currencyActions.changeCurrency(e.target.value));
  };
  useEffect(() => {
    dispatch(fetchTrendingCoins(currency));
  }, [dispatch, currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        sx={{ backgroundColor: "#000", position: "sticky", zIndex: "999" }}
      >
        <Container>
          <Toolbar sx={{ display: "flex" }}>
            <Typography
              onClick={() => navigate("/")}
              sx={{ color: "gold", fontWeight: "bold", cursor: "pointer" }}
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginLeft: "auto",
                marginRight: "10px",
              }}
              value={currency}
              onChange={currencyChangeHandler}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UserSideBar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
