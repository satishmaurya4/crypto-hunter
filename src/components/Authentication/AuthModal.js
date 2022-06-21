import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalForm from "./ModalForm";
import { GoogleButton } from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { auth } from "../../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "gray",
  boxShadow: 24,
  borderRadius: "10px",
  overflow: "hidden",

  boxShadow: "0px 0px 10px rgba(0,0,0,0.4)",
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(
          uiActions.alert({
            open: true,
            message: `Sign Up Successful. Welcome ${res.user.email}`,
            type: "success",
          })
        );
        handleClose();
      })
      .catch((error) => {
        dispatch(
          uiActions.alert({
            open: true,
            message: error.message,
            type: "error",
          })
        );
      });
  };

  return (
    <div>
      <Button
        varaint="contained"
        sx={{
          width: "85px",
          height: "40px",
          backgroundColor: "gold",
          color: "#fff",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalForm handleClose={handleClose} />
          <span>OR</span>
          <GoogleButton
            style={{ width: "100%", outline: "none" }}
            onClick={signInWithGoogle}
          />
        </Box>
      </Modal>
    </div>
  );
}
