import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SessionTemplate.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbLayoutList } from "react-icons/tb";
import { VscDebugContinue, VscDebugStart } from "react-icons/vsc";
import { getFormattedDatesObject } from "../../helpers/dateHelpers";
import Button from "../UI/Button/Button";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";
import { workoutActions } from "../../store/workout-slice";
import { useDispatch } from "react-redux";
import TemplateExercisesModal from "../UI/Modals/TemplateExercisesModal/TemplateExercisesModal";
import { ProcessedSession } from "../../helpers/workoutClasses";
import { settingsActions } from "../../store/settings-slice";

const SessionTemplate = ({ template }) => {
  const { name, ID, templateExercises, processedSessions } = template;
  const [isDeletingSession, setIsDeletingSession] = useState(false);
  const [isTemplateExercisesModalOpen, setIsTemplateExercisesModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastRunDate =
    processedSessions.length > 0
      ? processedSessions[processedSessions.length - 1].date.toString()
      : null;

  const date = getFormattedDatesObject(lastRunDate);

  const deleteSessionHandler = () => {
    dispatch(workoutActions.deleteSessionTemplate(ID));
    setIsDeletingSession(false);
  };

  const startSessionHandler = () => {
    dispatch(settingsActions.isNavbarDisabled(true));
    const currentDate = new Date();
    const processedSessionID = currentDate.getTime().toString();

    dispatch(
      workoutActions.addProcessedSession({
        sessionID: ID,
        processedSession: new ProcessedSession(
          currentDate,
          processedSessionID,
          templateExercises
        ),
      })
    );
    navigate(`/training/${ID}/${processedSessionID}`);
  };

  const showProcessedSessionsHandler = () => {
    navigate(`/training/processedSessions/${ID}`);
  };

  return (
    <>
      {isTemplateExercisesModalOpen && (
        <Backdrop>
          <TemplateExercisesModal
            closeModal={() => setIsTemplateExercisesModalOpen(false)}
            sessionTemplate={template}
          />
        </Backdrop>
      )}
      {isDeletingSession && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsDeletingSession(false);
            }}
            onConfirm={deleteSessionHandler}
            infoMsg={
              <p>
                Diese Sessionvorlage, ALLE dazugehörigen Übungen, sowie ALLE
                bereits abgearbeiteten Sessions werden durch diesen Vorgang
                <span className="danger-text"> endgültig gelöscht!</span>
              </p>
            }
          />
        </Backdrop>
      )}
      <div className={classes.SessionTemplate}>
        <div className={classes.sessionName}>{name}</div>
        <div className={classes.sessionData}>
          <div className={classes.exerciseCount}>
            <div>
              <span>Übungen:</span>
              <span> {templateExercises.length}</span>
            </div>
            <Button onClick={() => setIsTemplateExercisesModalOpen(true)}>
              Übungen <TbLayoutList />
            </Button>
          </div>
          <div className={classes.lastRun}>
            <div className={classes.lastRunDate}>
              <div className={classes.lastRunDateLabel}>letzte Session am:</div>
              <div className={classes.lastRunDateValue}>
                {date
                  ? `${date.dayName} ${date.day}.${date.month}.${date.year}`
                  : "k.A"}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.sessionActions}>
          <div className={classes.thumbButtons}>
            <Button
              addedClasses="thumb-button"
              onClick={() => setIsDeletingSession(true)}
            >
              <RiDeleteBin5Line />
            </Button>
            <Button
              addedClasses="thumb-button"
              onClick={showProcessedSessionsHandler}
            >
              <TbLayoutList />
            </Button>
          </div>
          <Button
            onClick={startSessionHandler}
            disabled={templateExercises.length === 0}
          >
            neue Session
            <VscDebugStart />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SessionTemplate;
