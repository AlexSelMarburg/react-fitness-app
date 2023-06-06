import classes from "./WeightDate.module.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const WeightDate = ({ dateString }) => {
  const date = new Date(dateString);
  const month = format(date, "MMM", { locale: de });
  const year = format(date, "yyyy", { locale: de });
  const day = format(date, "d", { locale: de });
  const time = format(date, "HH:mm", { locale: de });
  const dayName = format(date, "EEEE", { locale: de });

  return (
    <div className={classes.date}>
      <div className={classes.dayName}>{dayName}</div>
      <div className={classes.time}>{time}</div>
      <div className={classes.dayAndMonth}>
        {day} {month}
      </div>
      <div className={classes.year}>{year}</div>
    </div>
  );
};

export default WeightDate;
