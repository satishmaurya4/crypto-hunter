import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      dispatch(
        uiActions.alert({
          open: true,
          message: "Passwords do not match",
          type: "error",
        })
      );
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    console.log("Hello sign up", result)
      dispatch(uiActions.alert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      }));
      handleClose();
    } catch (error) {
      dispatch(uiActions.alert({
        type: "error",
        message: "Signning up faild!.",
        open: true,
      }));
    }
  };

  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: "gold", color: "#fff" }}
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default Signup;
