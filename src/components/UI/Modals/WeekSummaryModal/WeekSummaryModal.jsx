import classes from "./WeekSummaryModal.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../../Button/Button";
import WeekDayNutritionSummary from "../../../WeekDayNutritionSummary/WeekDayNutritionSummary";

const WeekSummaryModal = ({ nutrition = [], closeModal, title }) => {
  const weekDays = [
    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonntag",
  ];

  const weekDaysEntries = [];
  for (let i = 0; i < weekDays.length; i++) {
    if (weekDays[i] in nutrition) {
      weekDaysEntries.push(nutrition[weekDays[i]]);
    }
  }

  return (
    <div className={classes.WeekSummaryModal}>
      <div className={classes.heading}>
        <span>
          {title} ({nutrition.weekNumber})
        </span>
        <Button addedClasses="thumb-button" onClick={closeModal}>
          <FaSignOutAlt />
        </Button>
      </div>
      <div className={classes.weeklyNutritionList}>
        {weekDaysEntries.map((entry) => (
          <WeekDayNutritionSummary key={entry.name} entries={entry} />
        ))}
      </div>
    </div>
  );
};

export default WeekSummaryModal;
