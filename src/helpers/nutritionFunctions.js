import {
  isToday,
  isThisISOWeek,
  getISOWeek,
  subWeeks,
  format,
  getISODay,
} from "date-fns";
import { de } from "date-fns/locale";

export const PROTEIN_TO_KCALS_VALUE = 4.1;
export const CARBS_TO_KCALS_VALUE = 4.1;
export const FATS_TO_KCALS_VALUE = 9.2;

function getDayNutritionsObject(dayOfWeekNumber, dayname = "today") {
  const dayNutritionSummary = {
    entries: [],
    name: dayname,
    dayOfWeekNumber: dayOfWeekNumber,
    accumulatedCalories: 0,
    accumulatedFats: 0,
    accumulatedProteins: 0,
    accumulatedCarbs: 0,
    hasMissingCaloriesValues: false,
    hasMissingFatsValues: false,
    hasMissingProteinsValues: false,
    hasMissingCarbsValues: false,
  };

  return dayNutritionSummary;
}

function getWeekNutritionsObject(weekNumber, days = 7) {
  const weekDays = [
    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonntag",
  ];

  const weekNutritionSummary = {
    weekNumber,
    accumulatedCalories: 0,
    accumulatedCaloriesAverage: 0,
    hasMissingKcalsValues: false,
  };

  for (let i = 0; i < days; i++) {
    const dayName = weekDays[i];
    const dayNutritionSummary = getDayNutritionsObject(i + 1, dayName);
    weekNutritionSummary[dayName] = dayNutritionSummary;
  }

  return weekNutritionSummary;
}

function accumulateNutrients(currentNutritionEntry, nutriens) {
  if (currentNutritionEntry.calories !== null) {
    nutriens.accumulatedCalories += currentNutritionEntry.calories;
  } else {
    nutriens.hasMissingCaloriesValues = true;
  }

  if (currentNutritionEntry.fats !== null) {
    nutriens.accumulatedFats += currentNutritionEntry.fats;
  } else {
    nutriens.hasMissingFatsValues = true;
  }

  if (currentNutritionEntry.carbs !== null) {
    nutriens.accumulatedCarbs += currentNutritionEntry.carbs;
  } else {
    nutriens.hasMissingCarbsValues = true;
  }

  if (currentNutritionEntry.protein !== null) {
    nutriens.accumulatedProteins += currentNutritionEntry.protein;
  } else {
    nutriens.hasMissingProteinsValues = true;
  }
}

// returns an array of nutrition objects for today, current week and last week
export function generateFilteredNutritions(nutrition) {
  const currentWeekNumber = getISOWeek(new Date());
  const lastWeekNumber = getISOWeek(subWeeks(new Date(), 1));
  const currentDayOfWeek = getISODay(new Date());

  const todaysNutritions = getDayNutritionsObject(currentDayOfWeek);
  const currentWeekNutritions = getWeekNutritionsObject(
    currentWeekNumber,
    currentDayOfWeek
  );
  const lastWeekNutritions = getWeekNutritionsObject(lastWeekNumber);

  for (let i = 0; i < nutrition.length; i++) {
    const currentNutritionEntry = nutrition[i];
    const nutritionDateObj = new Date(currentNutritionEntry.date);
    const currentEntryWeekNumber = getISOWeek(nutritionDateObj);

    if (
      currentEntryWeekNumber === currentWeekNumber ||
      currentEntryWeekNumber === lastWeekNumber
    ) {
      if (isToday(nutritionDateObj)) {
        todaysNutritions.entries.push(currentNutritionEntry);
        accumulateNutrients(currentNutritionEntry, todaysNutritions);
      }

      if (isThisISOWeek(nutritionDateObj)) {
        currentWeekNutritions[
          format(nutritionDateObj, "eeee", { locale: de }).toLowerCase()
        ].entries.push(currentNutritionEntry);

        accumulateNutrients(
          currentNutritionEntry,
          currentWeekNutritions[
            format(nutritionDateObj, "eeee", { locale: de }).toLowerCase()
          ]
        );

        if (currentNutritionEntry.calories !== null) {
          currentWeekNutritions.accumulatedCalories +=
            currentNutritionEntry.calories;
        } else {
          currentWeekNutritions.hasMissingKcalsValues = true;
        }
      }

      if (currentEntryWeekNumber === lastWeekNumber) {
        lastWeekNutritions[
          format(nutritionDateObj, "eeee", { locale: de }).toLowerCase()
        ].entries.push(currentNutritionEntry);

        accumulateNutrients(
          currentNutritionEntry,
          lastWeekNutritions[
            format(nutritionDateObj, "eeee", { locale: de }).toLowerCase()
          ]
        );

        if (currentNutritionEntry.calories !== null) {
          lastWeekNutritions.accumulatedCalories +=
            currentNutritionEntry.calories;
        } else {
          lastWeekNutritions.hasMissingKcalsValues = true;
        }
      }
    } else {
      break;
    }
  }

  currentWeekNutritions.accumulatedCaloriesAverage = Math.trunc(
    currentWeekNutritions.accumulatedCalories / currentDayOfWeek
  );

  lastWeekNutritions.accumulatedCaloriesAverage = Math.trunc(
    lastWeekNutritions.accumulatedCalories / 7
  );

  // console.log("today: ", todaysNutritions);
  // console.log("current: ", currentWeekNutritions);
  // console.log("last: ", lastWeekNutritions);

  return [todaysNutritions, currentWeekNutritions, lastWeekNutritions];
}
