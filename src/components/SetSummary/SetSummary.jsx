import { useState } from "react";
import classes from "./SetSummary.module.css";
import Button from "../UI/Button/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { workoutActions } from "../../store/workout-slice";
import { useDispatch } from "react-redux";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";

const SetSummary = ({
  setNumber,
  processedExerciseID,
  processedSessionID,
  templateSessionID,
  set: { reps, weight },
}) => {
  const dispatch = useDispatch();
  const [isDeletingSet, setIsDeletingSet] = useState(false);

  const deleteSetHandler = () => {
    dispatch(
      workoutActions.removeExerciseSet({
        templateSessionID,
        processedSessionID,
        processedExerciseID,
        setIndex: setNumber - 1,
      })
    );

    setIsDeletingSet(false);
  };

  return (
    <>
      {isDeletingSet && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsDeletingSet(false);
            }}
            onConfirm={deleteSetHandler}
            infoMsg={
              <p>
                Durch diesen Vorgang wird das Set
                <span className="danger-text"> endgültig gelöscht!</span>
              </p>
            }
          />
        </Backdrop>
      )}

      <div className={classes.SetSummary}>
        <div className={classes.setNumber}>
          <span>NR:</span> <span className={classes.setValue}>{setNumber}</span>
        </div>
        <div className={classes.reps}>
          <span>reps:</span> <span className={classes.setValue}>{reps}</span>
        </div>
        <div className={classes.weight}>
          <span>kg</span>
          <span className={classes.setValue}>{weight}</span>
        </div>
        <div className={classes.volume}>
          <span>vol:</span>
          <span className={classes.setValue}>{(weight * reps).toFixed(0)}</span>
        </div>
        <div className={classes.actions}>
          <Button
            addedClasses="thumb-button"
            onClick={() => setIsDeletingSet(true)}
          >
            <RiDeleteBin5Line />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SetSummary;
