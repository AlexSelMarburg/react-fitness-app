import classes from "./WeightPage.module.css";
import Button from "../../components/UI/Button/Button";
import { useState, useMemo } from "react";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import NumPad from "../../components/NumPad/NumPad";
import { useSelector, useDispatch } from "react-redux";
import { bodyWeightsActions } from "../../store/bodyWeights-slice";
import { differenceInMinutes } from "date-fns";
import WeightData from "../../components/WeightData/WeightData";

const WeightPage = () => {
  const bodyWeights = useSelector((state) => state.bodyWeights);
  const nutrition = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();

  const [isAddingNewEntry, setIsAddingNewEntry] = useState(false);

  const addNutritionEntryHandler = () => {
    setIsAddingNewEntry(true);
  };

  const newEntryHandler = (weightValue) => {
    dispatch(
      bodyWeightsActions.addNewEntry({
        weight: weightValue,
        date: new Date(),
      })
    );
    setIsAddingNewEntry(false);
  };

  const removeWeightHandler = (weightDate) => {
    dispatch(bodyWeightsActions.removeEntry(weightDate));
  };

  const calculateKcalsDataBetweenTwoDates = (
    nutritionData,
    weightEntryDateSTR,
    previousWeightEntryDateSTR
  ) => {
    const previousWeightEntryDate = new Date(previousWeightEntryDateSTR);
    const weightEntryDate = new Date(weightEntryDateSTR);

    const filteredEntries = nutritionData.filter((entry) => {
      return (
        new Date(entry.date) >= previousWeightEntryDate &&
        new Date(entry.date) <= weightEntryDate
      );
    });

    const accumulatedKcals = filteredEntries.reduce(
      (accumulator, currentObject) =>
        currentObject.calories !== null
          ? accumulator + currentObject.calories
          : accumulator,
      0
    );

    const minutesPassed = differenceInMinutes(
      weightEntryDate,
      previousWeightEntryDate
    );

    const minutesAverageCalories =
      minutesPassed >= 1 ? accumulatedKcals / minutesPassed : accumulatedKcals;

    const hourlyAverageCalories =
      minutesPassed >= 60
        ? accumulatedKcals / (minutesPassed / 60)
        : accumulatedKcals;

    const dailyAverageCalories =
      minutesPassed >= 60 * 24
        ? accumulatedKcals / (minutesPassed / (60 * 24))
        : accumulatedKcals;

    const kcalsData = {
      accumulatedKcals,
      minutesAverageCalories: minutesAverageCalories.toFixed(2),
      hourlyAverageCalories: hourlyAverageCalories.toFixed(),
      dailyAverageCalories: dailyAverageCalories.toFixed(),
    };

    return kcalsData;
  };

  const entries = useMemo(() => {
    return bodyWeights.map((entry, index) => {
      let weightDifference;
      let caloriesData;
      if (bodyWeights.length === 1 || index === bodyWeights.length - 1) {
        weightDifference = null;
        caloriesData = null;
      } else {
        let difference =
          bodyWeights[index].weight - bodyWeights[index + 1].weight;
        let operator = difference > 0 ? "+" : difference < 0 ? "-" : "";
        weightDifference = operator + Math.abs(difference).toFixed(1);

        caloriesData = calculateKcalsDataBetweenTwoDates(
          nutrition,
          entry.date,
          bodyWeights[index + 1].date
        );
      }

      return {
        ...entry,
        ...caloriesData,
        weightDifference,
      };
    });
  }, [bodyWeights]);

  let content;
  if (bodyWeights.length === 0) {
    content = (
      <>
        <div className={`${classes.dataContainer} ${classes.empty}`}>
          <p className={classes.noWeightData}>
            Bisher wurden keine Daten aufgenommen!
          </p>
        </div>
      </>
    );
  } else {
    content = (
      <>
        {entries.map((entry) => (
          <WeightData
            key={entry.date}
            data={entry}
            onDelete={removeWeightHandler}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {isAddingNewEntry && (
        <Backdrop>
          <NumPad
            onAbort={() => setIsAddingNewEntry(false)}
            onNewEntry={newEntryHandler}
          />
        </Backdrop>
      )}
      <section className={classes.WeightPage}>
        <div className={classes.contentContainer}>{content}</div>

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

export default WeightPage;
