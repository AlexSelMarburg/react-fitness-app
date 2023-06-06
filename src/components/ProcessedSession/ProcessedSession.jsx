import { useState } from "react";
import classes from "./ProcessedSession.module.css";
import { getFormattedDatesObject } from "../../helpers/dateHelpers";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { workoutActions } from "../../store/workout-slice";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";

const ProcessedSession = ({ session: { date, ID }, templateSessionID }) => {
  const [isDeletingSession, setIsDeletingSession] = useState(false);

  const sessionDate = getFormattedDatesObject(date);
  const dispatch = useDispatch();

  const deleteProcessedSession = () => {
    dispatch(
      workoutActions.deleteProcessedSession({
        templateSessionID,
        ID,
      })
    );

    setIsDeletingSession(false);
  };

  return (
    <>
      {isDeletingSession && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsDeletingSession(false);
            }}
            onConfirm={deleteProcessedSession}
            infoMsg={
              <p>
                Durch diesen Vorgang wird diese Session
                <span className="danger-text"> endgültig gelöscht!</span>
              </p>
            }
          />
        </Backdrop>
      )}
      <div className={classes.ProcessedSession}>
        <div className={classes.data}>
          <div className={classes.date}>
            <div className={classes.dayName}>{sessionDate.fullDayName}</div>
            <span>
              {`${sessionDate.day}.${sessionDate.month}.${sessionDate.year}`}
            </span>
            <span> {sessionDate.time}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            addedClasses="thumb-button"
            onClick={() => setIsDeletingSession(true)}
          >
            <RiDeleteBin5Line />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProcessedSession;
