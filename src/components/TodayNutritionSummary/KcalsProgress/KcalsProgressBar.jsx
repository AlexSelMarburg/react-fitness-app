import classes from "./KcalsProgressBar.module.css";

const KcalsProgressBar = ({
  currentValue = 0,
  targetValue = 2000,
  unit = "kcals",
}) => {
  const percentage = `${Math.floor((currentValue / targetValue) * 100)}`;

  return (
    <div className={classes.KcalsProgressBar}>
      <div
        className={`${classes.fillerStyles} ${
          currentValue > targetValue ? classes.valueOverTarget : ""
        }`}
        style={{ maxWidth: `${percentage}%` }}
      >
        <span className={classes.percentage}>{percentage}%</span>
        <span
          className={classes.label}
        >{`${currentValue}/${targetValue} ${unit}`}</span>
      </div>
    </div>
  );
};
export default KcalsProgressBar;
