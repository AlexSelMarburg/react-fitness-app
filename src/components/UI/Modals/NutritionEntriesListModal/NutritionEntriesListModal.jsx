import classes from "./NutritionEntriesListModal.module.css";
import Button from "../../Button/Button";
import NutritionEntry from "../../../NutritionEntry/NutritionEntry";
import { FaSignOutAlt } from "react-icons/fa";

const NutritionEntriesListModal = ({ nutrition = [], date, closeModal }) => {
  let content;

  if (nutrition.length) {
    content = (
      <div className={classes.dailyNutritionList}>
        {nutrition.map((entry) => (
          <NutritionEntry key={entry.date} entries={entry} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className={`${classes.dailyNutritionList} ${classes.empty}`}>
        <p>An diesem Tag wurden keine Daten aufgenommen!</p>
      </div>
    );
  }

  return (
    <div className={classes.NutritionEntriesListModal}>
      <div className={classes.heading}>
        <span>{date}</span>
        <Button onClick={closeModal}>
          <FaSignOutAlt />
        </Button>
      </div>
      {content}
    </div>
  );
};

export default NutritionEntriesListModal;
