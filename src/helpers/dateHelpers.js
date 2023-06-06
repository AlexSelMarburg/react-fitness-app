import { format } from "date-fns";
import { de } from "date-fns/locale";

export const getFormattedDatesObject = (dateString) => {
  if (dateString === null) return null;

  const date = new Date(dateString);
  const month = format(date, "MM", { locale: de });
  const year = format(date, "yyyy", { locale: de });
  const day = format(date, "dd", { locale: de });
  const time = format(date, "HH:mm", { locale: de });
  const dayName = format(date, "EE", { locale: de });
  const fullDayName = format(date, "EEEE", { locale: de });

  return {
    fullDayName,
    dayName,
    day,
    month,
    year,
    time,
  };
};
