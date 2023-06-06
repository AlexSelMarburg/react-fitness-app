import classes from "./RangeSlider.module.css";

const RangeSlider = ({
  min = 0,
  max = 100,
  name,
  label,
  step = 1,
  unit = "kg",
  value,
  onChange,
}) => {
  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderLabel}>
        <label htmlFor={name}>{label}:</label>
        <div className={classes.sliderValue}>
          <span>{value}</span>
          <span>{unit}</span>
        </div>
      </div>
      <input
        id={name}
        name={name}
        className={classes.slider}
        step={step}
        type="range"
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        style={getBackgroundSize()}
        value={value}
      />
    </div>
  );
};

export default RangeSlider;
