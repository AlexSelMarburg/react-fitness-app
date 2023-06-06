import classes from "./ExercisePage.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import InfoButton from "../../components/UI/InfoButton/InfoButton";
import { FaSignOutAlt } from "react-icons/fa";
import PrevProcessedExercise from "../../components/PrevProcessedExercise/PrevProcessedExercise";
import CurrentProcessedExercise from "../../components/CurrentProcessedExercise/CurrentProcessedExercise";

const ExercisePage = () => {
  const navigate = useNavigate();
  const {
    templateSessionID,
    templateExerciseID,
    processedSessionID,
    processedExerciseID,
    processedExerciseIndex,
  } = useParams();
  const templateSession = useSelector(
    (state) => state.workout[templateSessionID]
  );
  const templateExercise = templateSession.templateExercises.find(
    (templateExercise) => templateExercise.ID === templateExerciseID
  );
  const { description, name, maxReps, minReps, setsCount } = templateExercise;
  const processedSessionNumber = templateSession.processedSessions.length;
  const currentProcessedExercise =
    templateSession.processedSessions[0].processedExercises[
      processedExerciseIndex
    ];

  const prevProcessedSessionIndex = processedSessionNumber > 1 ? 1 : null;
  let prevSessionProcessedExercise = null;
  if (prevProcessedSessionIndex !== null) {
    prevSessionProcessedExercise = templateSession.processedSessions[
      prevProcessedSessionIndex
    ].processedExercises.find(
      (exercise) =>
        exercise.parentTemplateExerciseID ===
        currentProcessedExercise.parentTemplateExerciseID
    );
  }

  return (
    <section className={classes.ExercisePage}>
      <div className={classes.sessionHeader}>
        <div className={classes.exerciseTitle}>{name}</div>
        <div className={classes.exerciseInfo}>
          <div className={classes.infoData}>
            <div className={classes.exerciseSets}>
              <span>goal-sets: </span>
              {setsCount}
            </div>
            <div className={classes.exerciseReps}>
              <span>goal-reps: </span> {minReps} - {maxReps}
            </div>
            <div className={classes.exerciseDescription}>
              <span>Infos zur Übung: </span>
              <InfoButton
                info={
                  description.length > 0 ? description : "keine Beschreibung"
                }
              />
            </div>
          </div>
          <div className={classes.actions}>
            <Button addedClasses="thumb-button" onClick={() => navigate(-1)}>
              <FaSignOutAlt />
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.exercisesContainer}>
        <div>
          <CurrentProcessedExercise
            currentProcessedExercise={currentProcessedExercise}
            maxReps={maxReps}
            prevSessionSets={prevSessionProcessedExercise?.sets || []}
            templateSessionID={templateSessionID}
            processedSessionID={processedSessionID}
            processedExerciseID={processedExerciseID}
          />

          {prevSessionProcessedExercise &&
            prevSessionProcessedExercise.sets.length > 0 && (
              <>
                <div className={classes.VsSeperator}>VS</div>
                <PrevProcessedExercise
                  prevSessionSets={prevSessionProcessedExercise.sets}
                />
              </>
            )}
        </div>
      </div>
    </section>
  );
};

export default ExercisePage;
