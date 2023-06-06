import { IoIosKeypad } from "react-icons/io";
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";
import Button from "../../Button/Button";
import RangeSlider from "../../RangeSlider/RangeSlider";
import classes from "./AddSetToExerciseModal.module.css";
import { useState } from "react";
import NumPad from "../../../NumPad/NumPad";
import Backdrop from "../../Backdrop/Backdrop";

const REPETITIONS_OVER_MAX_REPS = 10;
const WEIGHT_CHANGE_STEP = 1;

const AddSetToExerciseModal = ({
  onAbort,
  maxReps,
  onCreatNewSet,
  lastWeight,
}) => {
  const [reps, setReps] = useState(maxReps);
  const [isUsingNumpad, setIsUsingNumpad] = useState(false);
  const [weightValue, setWeightValue] = useState(lastWeight);

  const acceptNumPadValue = (value) => {
    setWeightValue(value);
    setIsUsingNumpad(false);
  };

  const upWeightValueHandler = () => {
    setWeightValue((prevValue) => prevValue + WEIGHT_CHANGE_STEP);
  };

  const downWeightValueHandler = () => {
    if (weightValue - WEIGHT_CHANGE_STEP < 1) return;
    setWeightValue((prevValue) => prevValue - WEIGHT_CHANGE_STEP);
  };

  const changeRepetitionsHandler = (value) => {
    if (value > maxReps + REPETITIONS_OVER_MAX_REPS) return;
    setReps(+value);
  };

  const onAddNewSet = () => {
    onCreatNewSet(+reps, +weightValue);
    onAbort();
  };

  return (
    <>
      {isUsingNumpad && (
        <Backdrop>
          <NumPad
            maxIntegerDigits={3}
            onFloatingPoint={false}
            onAbort={() => setIsUsingNumpad(false)}
            onNewEntry={acceptNumPadValue}
            maxFloatingDigits={2}
          />
        </Backdrop>
      )}

      <div className={classes.AddSetToExerciseModal}>
        <div className={classes.title}>
          Satz Nr: <span>1</span>
        </div>
        <div className={classes.inputsContainer}>
          <RangeSlider
            min={1}
            max={maxReps + REPETITIONS_OVER_MAX_REPS}
            label="Wiederholungen"
            unit="reps"
            name="repetitions"
            step={1}
            value={reps}
            onChange={changeRepetitionsHandler}
          />
          <div className={classes.weightSettingsContainer}>
            <div>
              <div className={classes.weightData}>
                <div className={classes.weightLabel}>Gewicht:</div>
                <div className={classes.weightValue}>
                  {weightValue} <span>kg</span>
                </div>
              </div>
              <div className={classes.weightUpDownButtons}>
                <Button
                  onClick={upWeightValueHandler}
                  addedClasses="thumb-button"
                >
                  <AiFillUpCircle />
                </Button>
                <Button
                  onClick={downWeightValueHandler}
                  addedClasses="thumb-button"
                >
                  <AiFillDownCircle />
                </Button>
              </div>
            </div>
            <Button
              addedClasses="thumb-button"
              onClick={() => setIsUsingNumpad(true)}
            >
              <IoIosKeypad />
            </Button>
          </div>
        </div>

        <div className={classes.actions}>
          <Button onClick={onAbort}>abbrechen</Button>
          <Button onClick={onAddNewSet}>speichern</Button>
        </div>
      </div>
    </>
  );
};

export default AddSetToExerciseModal;
