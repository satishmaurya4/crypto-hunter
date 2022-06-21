import React from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "40%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "#fff", fontWeight: "bold", marginBottom: "15px" }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "darkgrey", textTransform: "capitalize" }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
