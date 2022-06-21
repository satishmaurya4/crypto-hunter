import { ThemeProvider } from "@emotion/react";
import {
  Container,
  LinearProgress,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCoins } from "../store/currencyDataAction";
import { loadingSliceActions } from "../store/loading-slice";
import { darkTheme } from "../Theme/Theme";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);
  const symbol = useSelector((state) => state.currency.symbol);
  const coins = useSelector((state) => state.currencyData.coins);
  const loading = useSelector((state) => state.loading.status);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    const getCoins = async () => {
      await dispatch(fetchCoins(currency));
      // setLoading(false);
      dispatch(loadingSliceActions.loading())
    };
    getCoins();
  }, [dispatch, currency]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: "18px", color: "#fff" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "gold" },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "gold",
              },
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <>
              <Table>
                <TableHead style={{ backgroundColor: "gold" }}>
                  <TableRow>
                    {["Coin", "Price", "24th Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                          }}
                          sx={{ fontWeight: "bold" }}
                          key={head}
                          align={head === "Coin" ? "left" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          hover={true}
                          onClick={() => navigate(`/coins/${row.id}`)}
                          style={{
                            cursor: "pointer",
                          }}
                          sx={{
                            backgroundColor: "#16171a",
                          }}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <img src={row?.image} alt={row.name} height="50" />
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgba(14, 203, 129" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)} %
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}{" "}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
