import classes from "./StartExercise.module.css";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { VscDebugContinue } from "react-icons/vsc";

const StartExercise = ({
  templateExercise: { name, ID, setsCount },
  templateSessionID,
  processedExercise,
  processedSessionID,
  processedExerciseIndex,
}) => {
  const navigate = useNavigate();
  const goToExercisePageHandler = () => {
    navigate(
      `/training/${templateSessionID}/exercise/${ID}/${processedSessionID}/${processedExercise.ID}/${processedExerciseIndex}`
    );
  };

  return (
    <div className={classes.StartExercise}>
      <div
        className={`${classes.completionIndicator} ${
          processedExercise.sets.length >= setsCount ? classes.completed : ""
        }`}
      ></div>
      <div className={classes.data}>
        <div className={classes.title}>
          {name.length < 20 ? name : name.slice(0, 20) + "..."}
        </div>
        <div className={classes.sets}>
          sets:{" "}
          <span>
            <span
              className={
                processedExercise.sets.length < setsCount ? "danger-text" : ""
              }
            >
              {processedExercise.sets.length}{" "}
            </span>
            <span className={classes.of}>von</span> {setsCount}
          </span>
        </div>
      </div>

      <div className={classes.actions}>
        <Button addedClasses="thumb-button" onClick={goToExercisePageHandler}>
          <VscDebugContinue />
        </Button>
      </div>
    </div>
  );
};

export default StartExercise;
