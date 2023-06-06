import { useRef, useState, useEffect } from "react";
import Button from "../../Button/Button";
import classes from "./CreateExerciseTemplateModal.module.css";
import RangeSlider from "../../RangeSlider/RangeSlider";

const CreateExerciseTemplateModal = ({
  closeModal,
  onSubmit,
  prePopulatingData = null,
}) => {
  const [minReps, setMinReps] = useState(8);
  const [maxReps, setMaxReps] = useState(12);
  const [sets, setSets] = useState(4);
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (prePopulatingData) {
      const { name, description, minReps, maxReps, sets } = prePopulatingData;
      setMaxReps(maxReps);
      setMinReps(minReps);
      setSets(sets);
      descriptionRef.current.value = description;
      titleRef.current.value = name;
    }
  }, [prePopulatingData]);

  const changeMinRepsHandler = (value) => {
    removeFocusFromInputs();
    if (+value > maxReps) return;
    setMinReps(+value);
  };

  const changeMaxRepsHandler = (value) => {
    removeFocusFromInputs();
    if (+value < minReps) return;
    setMaxReps(+value);
  };

  const changeSetsHandler = (value) => {
    removeFocusFromInputs();
    setSets(+value);
  };

  const removeFocusFromInputs = () => {
    titleRef.current.blur();
    descriptionRef.current.blur();
  };

  const isInputDataValid = () => {
    const title = titleRef.current.value;

    return (
      title.length > 0 && +minReps > 0 && +maxReps > 0 && +minReps <= +maxReps
    );
  };

  const submitHandler = () => {
    if (!isInputDataValid()) {
      return;
    }

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    onSubmit(title, description, +minReps, +maxReps, +sets);
    closeModal();
  };

  return (
    <div className={classes.CreateExerciseTemplateModal}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={classes.textInput}>
          <label htmlFor="exercise-name">Name der Übung:</label>
          <input
            type="text"
            maxLength={25}
            placeholder="z.B. Biceps Curls mit Kurzhantel"
            id="exercise-name"
            name="exercise-name"
            ref={titleRef}
            className={classes.titleInput}
          />
        </div>
        <div className={classes.textInput}>
          <label htmlFor="exercise-description">
            Zusätzliche Übungs-Infos:
          </label>
          <textarea
            ref={descriptionRef}
            id="exercise-description"
            name="exercise-description"
            rows={4}
            cols={50}
            maxLength={120}
            placeholder="z.B. Sitzeinstellung, Ausführungsinformationen , etc (optional)"
          />
        </div>

        <div className={classes.rangeSliderContainer}>
          <RangeSlider
            min={1}
            max={50}
            label="min. Wiederholungen"
            unit="reps"
            name="minReps"
            step={1}
            value={minReps}
            onChange={changeMinRepsHandler}
          />
        </div>
        <div className={classes.rangeSliderContainer}>
          <RangeSlider
            min={1}
            max={50}
            label="max. Wiederholungen"
            unit="reps"
            name="maxReps"
            step={1}
            value={maxReps}
            onChange={changeMaxRepsHandler}
          />
        </div>
        <div className={classes.rangeSliderContainer}>
          <RangeSlider
            min={1}
            max={10}
            label="Sets"
            unit="sets"
            name="sets"
            step={1}
            value={sets}
            onChange={changeSetsHandler}
          />
        </div>
      </form>
      <div className={classes.actions}>
        <Button onClick={closeModal}>abbrechen</Button>
        <Button onClick={submitHandler}>annehmen</Button>
      </div>
    </div>
  );
};

export default CreateExerciseTemplateModal;
