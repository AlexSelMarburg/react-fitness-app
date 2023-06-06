import classes from "./TemplateExercisesModal.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../../Button/Button";
import { workoutActions } from "../../../../store/workout-slice";
import { useDispatch } from "react-redux";
import ExerciseTemplate from "../../../ExerciseTemplate/ExerciseTemplate";
import { TemplateExercise } from "../../../../helpers/workoutClasses";
import { useState } from "react";
import CreateExerciseTemplateModal from "../CreateExerciseTemplateModal/CreateExerciseTemplateModal";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const TemplateExercisesModal = ({ closeModal, sessionTemplate }) => {
  const [isCreatingExerciseTemplate, setIsCreatingExerciseTemplate] =
    useState(false);
  const { name, ID, templateExercises } = sessionTemplate;
  const dispatch = useDispatch();

  const addTemplateExercise = (name, description, minReps, maxReps, sets) => {
    dispatch(
      workoutActions.addTemplateExercise({
        ID,
        exerciseTemplate: new TemplateExercise(
          name,
          description,
          minReps,
          maxReps,
          sets
        ),
      })
    );
  };

  let content;
  if (templateExercises.length > 0) {
    content = (
      <div className={classes.templateExercisesList}>
        {templateExercises.map((exercise, index) => (
          <ExerciseTemplate
            key={index}
            exercise={exercise}
            templateSessionID={ID}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className={`${classes.templateExercisesList} ${classes.empty}`}>
        <p>Es wurden noch keine Übungen hinzugefügt!</p>
      </div>
    );
  }

  return (
    <>
      {isCreatingExerciseTemplate && (
        <Backdrop>
          <CreateExerciseTemplateModal
            closeModal={() => setIsCreatingExerciseTemplate(false)}
            onSubmit={addTemplateExercise}
          />
        </Backdrop>
      )}
      <div className={classes.TemplateExercisesModal}>
        <div className={classes.heading}>
          <span>{name}</span>
          <div>
            <Button onClick={closeModal} addedClasses="thumb-button">
              <FaSignOutAlt />
            </Button>
          </div>
        </div>
        {content}
        <div className={classes.actions}>
          <Button onClick={() => setIsCreatingExerciseTemplate(true)}>
            Übung hinzufügen
          </Button>
        </div>
      </div>
    </>
  );
};

export default TemplateExercisesModal;
