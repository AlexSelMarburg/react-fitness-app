import { useState } from "react";
import { workoutActions } from "../../store/workout-slice";
import Button from "../UI/Button/Button";
import classes from "./ExerciseTemplate.module.css";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";
import CreateExerciseTemplateModal from "../UI/Modals/CreateExerciseTemplateModal/CreateExerciseTemplateModal";

const ExerciseTemplate = ({ exercise, templateSessionID }) => {
  const { ID, description, maxReps, minReps, name, setsCount } = exercise;
  const dispatch = useDispatch();
  const [isDeletingTemplateExercise, setIsDeletingTemplateExercise] =
    useState(false);
  const [isCreatingExerciseTemplate, setIsCreatingExerciseTemplate] =
    useState(false);

  const deleteTemplateExerciseHandler = () => {
    dispatch(
      workoutActions.removeTemplateExercise({
        sessionID: templateSessionID,
        exerciseID: ID,
      })
    );
    setIsDeletingTemplateExercise(false);
  };

  const editTemplateExerciseHandler = (
    title,
    description,
    minReps,
    maxReps,
    sets
  ) => {
    dispatch(
      workoutActions.editTemplateExercise({
        sessionID: templateSessionID,
        exerciseID: ID,
        name: title,
        description,
        maxReps: +maxReps,
        minReps: +minReps,
        sets: +sets,
      })
    );
  };

  return (
    <>
      {isCreatingExerciseTemplate && (
        <Backdrop>
          <CreateExerciseTemplateModal
            closeModal={() => setIsCreatingExerciseTemplate(false)}
            onSubmit={editTemplateExerciseHandler}
            prePopulatingData={exercise}
          />
        </Backdrop>
      )}
      {isDeletingTemplateExercise && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsDeletingTemplateExercise(false);
            }}
            onConfirm={deleteTemplateExerciseHandler}
            infoMsg={
              <p>
                Diese Übungsvorlage wird durch diesen Vorgang
                <span className="danger-text"> endgültig gelöscht</span>
              </p>
            }
          />
        </Backdrop>
      )}
      <div className={classes.ExerciseTemplate}>
        <div className={classes.title}>{name}</div>
        <div className={classes.actions}>
          <div className={classes.repsRange}>
            <div>
              {setsCount} <span>Sets</span>
            </div>
            <div>
              {minReps} - {maxReps} <span>Wiederholungen</span>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              onClick={() => setIsDeletingTemplateExercise(true)}
              addedClasses="thumb-button"
            >
              <RiDeleteBin5Line />
            </Button>
            <Button
              onClick={() => setIsCreatingExerciseTemplate(true)}
              addedClasses="thumb-button"
            >
              <RiEditLine />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseTemplate;
