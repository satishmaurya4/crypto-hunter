import React from "react";
import { Button } from "@mui/material";

const SelectedButton = ({ children, onClick, selected }) => {
  return (
    <Button
      variant="outlined"
      disableRipple
      sx={{
        border: "1px solid gold",
        borderRadius: "5px",
        padding: "10",
        paddingLeft: "20",
        paddingRight: "20",
        color: selected ? "#000" : "#fff",
        backgroundColor: selected ? "gold" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "#000",
          border: "1px solid gold",
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SelectedButton;
