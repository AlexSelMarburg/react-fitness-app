import { useState } from "react";
import classes from "./CurrentProcessedExercise.module.css";
import Button from "../UI/Button/Button";
import AddSetToExerciseModal from "../UI/Modals/AddSetToExerciseModal/AddSetToExerciseModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import { Set } from "../../helpers/workoutClasses";
import { workoutActions } from "../../store/workout-slice";
import { useDispatch } from "react-redux";
import SetSummary from "../SetSummary/SetSummary";

const CurrentProcessedExercise = ({
  currentProcessedExercise,
  maxReps,
  templateSessionID,
  processedSessionID,
  processedExerciseID,
  prevSessionSets,
}) => {
  const [isAddingNewSet, setIsAddingNewSet] = useState(false);
  const dispatch = useDispatch();

  const handleAddSet = () => {
    setIsAddingNewSet(true);
  };

  const addNewSetHandler = (reps, weight) => {
    dispatch(
      workoutActions.addExerciseSet({
        templateSessionID,
        processedSessionID,
        processedExerciseID,
        set: new Set(reps, weight),
      })
    );
  };

  const sets = currentProcessedExercise.sets;
  const accSetsVolume = sets.reduce((acc, set) => {
    return acc + set.reps * set.weight;
  }, 0);

  const lastWeight =
    prevSessionSets.length > 0 && prevSessionSets?.[sets.length]?.weight
      ? prevSessionSets[sets.length].weight
      : sets.length > 0
      ? sets[sets.length - 1].weight
      : 1;
  const lastReps =
    prevSessionSets.length > 0 && prevSessionSets?.[sets.length]?.reps
      ? prevSessionSets[sets.length].reps
      : sets.length > 0
      ? sets[sets.length - 1].reps
      : maxReps;

  return (
    <>
      {isAddingNewSet && (
        <Backdrop>
          <AddSetToExerciseModal
            maxReps={lastReps}
            lastWeight={lastWeight}
            onAbort={() => setIsAddingNewSet(false)}
            onCreatNewSet={addNewSetHandler}
          />
        </Backdrop>
      )}
      <div className={classes.CurrentProcessedExercise}>
        <div className={classes.title}>
          <span>aktuelle Session</span>
        </div>
        <div className={classes.processedExercisesContainer}>
          {sets.map((set, index) => (
            <SetSummary
              key={index}
              set={set}
              setNumber={index + 1}
              processedExerciseID={processedExerciseID}
              processedSessionID={processedSessionID}
              templateSessionID={templateSessionID}
            />
          ))}
          {sets.length === 0 && (
            <p style={{ textAlign: "center" }}>Noch keine Sets erfasst.</p>
          )}
          {sets.length > 0 && (
            <div className={classes.summary}>
              <span> Gesamtvolumen:</span>
              <span> {accSetsVolume.toFixed(0)}</span>
            </div>
          )}
        </div>
        <div className={classes.actions}>
          <Button onClick={handleAddSet}>Satz hinzufügen</Button>
        </div>
      </div>
    </>
  );
};

export default CurrentProcessedExercise;
