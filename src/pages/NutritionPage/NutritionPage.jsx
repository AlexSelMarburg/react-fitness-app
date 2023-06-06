import classes from "./NutritionPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { nutritionActions } from "../../store/nutrition-slice";
import Button from "../../components/UI/Button/Button";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import NutritionEntryModal from "../../components/UI/Modals/NutritionEntryModal/NutritionEntryModal";
import { useState, useMemo, memo } from "react";
import TodayNutritionSummary from "../../components/TodayNutritionSummary/TodayNutritionSummary";
import WeekNutritionSummary from "../../components/WeekNutritionSummary/WeekNutritionSummary";
import { generateFilteredNutritions } from "../../helpers/nutritionFunctions";

const NutritionPage = () => {
  const nutrition = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();

  const [isAddingNewEntry, setIsAddingNewEntry] = useState(false);

  const [todaysNutrition, currentWeekNutrition, lastWeekNutrition] =
    useMemo(() => {
      return generateFilteredNutritions(nutrition);
    }, [nutrition]);

  const addNutritionEntryHandler = () => {
    setIsAddingNewEntry(true);
  };

  const createNewNutritionEntryHandler = (mealData) => {
    dispatch(nutritionActions.addNewEntry(mealData));
    setIsAddingNewEntry(false);
  };

  return (
    <>
      {isAddingNewEntry && (
        <Backdrop>
          <NutritionEntryModal
            onAcceptMealData={createNewNutritionEntryHandler}
            onAbortMealEditing={() => setIsAddingNewEntry(false)}
          />
        </Backdrop>
      )}
      <section className={classes.NutritionPage}>
        <div className={classes.contentContainer}>
          <TodayNutritionSummary nutrition={todaysNutrition} />
          <WeekNutritionSummary nutrition={currentWeekNutrition} />
          <WeekNutritionSummary
            nutrition={lastWeekNutrition}
            title="letzte Woche"
          />
        </div>

        <div className={classes.actions}>
          <Button
            onClick={addNutritionEntryHandler}
            addedClasses={classes.newEntryBtn}
          >
            Neuer Eintrag
          </Button>
        </div>
      </section>
    </>
  );
};

export default memo(NutritionPage);
