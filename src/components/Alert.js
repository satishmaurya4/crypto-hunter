import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

function AppAlert() {
  const [show, setShow] = useState(true);
  const alert = useSelector((state) => state.ui.alert);
  const dispatch = useDispatch();
console.log(alert)
  const container = {
    backgroundColor: alert.type === "success" ? "green" : "red",
    color: alert.type === "success" ? "lightgreen" : "pink",
    width: "max-content",
    position: "fixed",
    bottom: "10px",
    left: "20px",
    display: "flex",
    padding: "10px",
    borderRadius: "5px",
    gap: "10px",
    alignItems: "center",
    zIndex: 999,
  };
  const close = {
    backgroundColor: alert.type === "success" ? "lightgreen" : "pink",
    color: alert.type === "success" ? "green" : "red",
    width: "20px",
    height: "20px",
    textAlign: "center",
    lineHeight: "20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  }

  if (alert.open) {
    return (
      <div style={container}>
        <span>{alert.message}</span>
        <span
          style={close}
          onClick={() =>
            dispatch(
              uiActions.alert({
                open: false,
              })
            )
          }
        >
          X
        </span>
      </div>
    );
  }
}

export default AppAlert;
