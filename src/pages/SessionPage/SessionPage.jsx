import { useState } from "react";
import classes from "./SessionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StartExercise from "../../components/StartExercise/StartExercise";
import Button from "../../components/UI/Button/Button";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import ConfirmationModal from "../../components/UI/Modals/ConfirmationModal/ConfirmationModal";
import { getFormattedDatesObject } from "../../helpers/dateHelpers";
import { settingsActions } from "../../store/settings-slice";

const SessionPage = () => {
  const [isUserFinishingSession, setIsUserFinishingSession] = useState(false);
  const { templateSessionID, processedSessionID } = useParams();
  const navigate = useNavigate();
  const { name, processedSessions, templateExercises } = useSelector(
    (state) => state.workout[templateSessionID]
  );
  const currentProcessedSession = processedSessions.find(
    (session) => session.ID === processedSessionID
  );
  const { dayName, day, month, year } = getFormattedDatesObject(
    currentProcessedSession.date
  );
  const dispatch = useDispatch();

  return (
    <>
      {isUserFinishingSession && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsUserFinishingSession(false);
            }}
            onConfirm={() => {
              dispatch(settingsActions.isNavbarDisabled(false));
              navigate(-1);
            }}
            infoMsg={"Session beenden?"}
          />
        </Backdrop>
      )}

      <section className={classes.SessionPage}>
        <div className={classes.sessionHeader}>
          <div className={classes.sessionTitle}>{name}</div>
          <div className={classes.sessionDate}>
            <span>Datum: </span> {day}.{month}.{year} ({dayName})
          </div>
          <div className={classes.sessionNumber}>
            <span>Sitzung Nr: </span>
            {processedSessions.length}
          </div>
          <div className={classes.sessionActions}>
            <Button onClick={() => setIsUserFinishingSession(true)}>
              session beenden
            </Button>
          </div>
        </div>

        <br />
        <div className={classes.exercisesContainer}>
          {templateExercises.map((templateExercise, index) => {
            const processedExercise =
              currentProcessedSession.processedExercises.find(
                (exercise) =>
                  exercise.parentTemplateExerciseID === templateExercise.ID
              );

            return (
              <StartExercise
                key={index}
                templateSessionID={templateSessionID}
                templateExercise={templateExercise}
                processedSessionID={processedSessionID}
                processedExercise={processedExercise}
                processedExerciseIndex={index}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SessionPage;
