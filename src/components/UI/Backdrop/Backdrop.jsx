import classes from "./Backdrop.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return (
    <>
      {createPortal(
        <div className={classes.backdrop}>
          <div className={classes.modal}>{props.children}</div>
        </div>,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default Backdrop;
