import classes from "./NutritionValueDisplay.module.css";

const NutritionValueDisplay = ({
  isEdited = false,
  type,
  value,
  unit = "g",
  addedClasses,
}) => {
  return (
    <div
      className={`${classes[addedClasses]} ${classes.NutritionValueDisplay} ${
        isEdited ? classes.currentActiveNutritionValue : null
      }`}
    >
      <p className={classes.label}>{type}</p>
      <p className={classes.value}>
        {value ?? "k.A "}

        <span>{value && unit}</span>
      </p>
    </div>
  );
};

export default NutritionValueDisplay;
