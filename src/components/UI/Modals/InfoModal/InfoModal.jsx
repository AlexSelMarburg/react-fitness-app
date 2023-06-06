import classes from "./InfoModal.module.css";
import Button from "../../Button/Button";

const InfoModal = ({ information, onConfirm }) => {
  return (
    <div className={classes.InfoModal}>
      <div className={classes.informationContainer}>{information}</div>
      <div className={classes.actions}>
        <Button onClick={onConfirm}>verstanden</Button>
      </div>
    </div>
  );
};

export default InfoModal;
