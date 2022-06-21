import { Box } from "@mui/material";
import React from "react";
import Banner from "../Banner/Banner";
import CoinsTable from "../CoinsTable";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
      }}
    >
      <Banner />
      <CoinsTable />
    </Box>
  );
};

export default HomePage;
