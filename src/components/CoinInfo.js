import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartData } from "../store/currencyDataAction";
import { darkTheme } from "../Theme/Theme";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { styled } from "@mui/material/styles";
import { chartDays } from "../config/chartButtonData";
import SelectedButton from "./SelectedButton";

const CoinInfo = ({ coin }) => {
  const [days, setDays] = useState(1);
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);
  const chartData = useSelector((state) => state.currencyData.chartData);

  const Responsive = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: "0px",
      padding: "20px",
      paddingTop: "0px",
    },
  }));

  useEffect(() => {
    dispatch(fetchChartData(coin.id, days, currency));
  }, [currency, days, coin.id, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Responsive
        sx={{
          width: "75%",
          dispaly: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
          padding: "40px",
        }}
      >
        {!chartData.prices ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
          </Box>
        ) : (
          <>
            <Line
              data={{
                labels: chartData.prices.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours > 12
                      ? `${date.getHours - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: chartData.prices.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days in ${currency})`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {chartDays.map((day) => (
                <SelectedButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectedButton>
              ))}
            </Box>
          </>
        )}
      </Responsive>
    </ThemeProvider>
  );
};

export default CoinInfo;
