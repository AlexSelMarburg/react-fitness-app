import classes from "./NutritionEntry.module.css";
import { useState } from "react";
import { format, set } from "date-fns";
import { de } from "date-fns/locale";
import Button from "../UI/Button/Button";
import Backdrop from "../UI/Backdrop/Backdrop";
import NutritionEntryModal from "../UI/Modals/NutritionEntryModal/NutritionEntryModal";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";
import { deleteDataMessage } from "../../helpers/modalMessages";
import { useDispatch } from "react-redux";
import { nutritionActions } from "../../store/nutrition-slice";

const NutritionEntry = ({
  entries: { calories, protein, carbs, fats, date },
}) => {
  const dispatch = useDispatch();
  const [isRemovingEntry, setIsRemovingEntry] = useState(false);
  const [isEditingEntry, setIsEditingEntry] = useState(false);
  const dateObject = new Date(date);
  const formatedTime = format(dateObject, "HH:mm", { locale: de });

  const removeEntryHandler = () => {
    dispatch(nutritionActions.removeEntry(date));
    setIsRemovingEntry(false);
  };

  const editNutritionEntryHandler = (editedNutritionData) => {
    dispatch(nutritionActions.editEntry(editedNutritionData));
    setIsEditingEntry(false);
  };

  return (
    <>
      {isEditingEntry && (
        <Backdrop>
          <NutritionEntryModal
            onAcceptMealData={editNutritionEntryHandler}
            onAbortMealEditing={() => setIsEditingEntry(false)}
            data={{
              calories: calories ? calories.toString() : null,
              protein: protein ? protein.toString() : null,
              carbs: carbs ? carbs.toString() : null,
              fats: fats ? fats.toString() : null,
              date,
            }}
          />
        </Backdrop>
      )}
      {isRemovingEntry && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsRemovingEntry(false);
            }}
            onConfirm={removeEntryHandler}
            infoMsg={deleteDataMessage}
          />
        </Backdrop>
      )}
      <div className={classes.NutritionEntry}>
        <div className={classes.upperContainer}>
          <div className={classes.calories}>
            <span>{calories ?? "k.A"}</span>
            <span>kcals</span>
          </div>
          <div className={classes.time}>{formatedTime}</div>
        </div>

        <div className={classes.lowerContainer}>
          <div className={classes.nutrients}>
            <div className={`${classes.nutrient} ${classes.protein}`}>
              <div className={classes.nutrientName}>protein</div>
              <div className={classes.nutrientValue}>{protein ?? "k.A"}</div>
            </div>
            <div className={`${classes.nutrient} ${classes.carbs}`}>
              <div className={classes.nutrientName}>carbs</div>
              <div className={classes.nutrientValue}>{carbs ?? "k.A"}</div>
            </div>
            <div className={`${classes.nutrient} ${classes.fats}`}>
              <div className={classes.nutrientName}>fats</div>
              <div className={classes.nutrientValue}>{fats ?? "k.A"}</div>
            </div>
          </div>

          <div className={classes.actions}>
            <Button
              onClick={() => {
                setIsRemovingEntry(true);
              }}
              addedClasses={classes.deleteButton}
            >
              <RiDeleteBin5Line />
            </Button>
            <Button
              addedClasses={classes.editButton}
              onClick={() => {
                setIsEditingEntry(true);
              }}
            >
              <RiEditLine />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NutritionEntry;
