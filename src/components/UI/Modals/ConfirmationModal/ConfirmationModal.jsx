import classes from "./ConfirmationModal.module.css";
import Button from "../../Button/Button";

function ConfirmationModal({ infoMsg, onAbort, onConfirm }) {
  return (
    <div className={classes.ConfirmationModal}>
      <div className={classes.informationContainer}>{infoMsg}</div>
      <div className={classes.actions}>
        <Button
          addedClasses={classes.abortBtn}
          onClick={() => {
            onAbort();
          }}
        >
          Abbrechen
        </Button>
        <Button
          addedClasses={classes.confirmBtn}
          onClick={() => {
            onConfirm();
          }}
        >
          Bestätigen
        </Button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
