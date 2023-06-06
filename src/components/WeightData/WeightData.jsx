import classes from "./WeightData.module.css";
import WeightDate from "./WeightDate";
import Button from "../UI/Button/Button";
import { useState } from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";

const WeightData = ({
  data: {
    weight,
    date,
    accumulatedKcals,
    hourlyAverageCalories,
    dailyAverageCalories,
    weightDifference,
    minutesAverageCalories,
  },
  onDelete,
}) => {
  const [isRemovingNewEntry, setIsRemovingNewEntry] = useState(false);

  return (
    <>
      {isRemovingNewEntry && (
        <Backdrop>
          <ConfirmationModal
            infoMsg={"Sollen die Daten wirklich gelöscht werden?"}
            onAbort={() => {
              setIsRemovingNewEntry(false);
            }}
            onConfirm={() => {
              onDelete(date);
            }}
          />
        </Backdrop>
      )}

      <div className={classes.WeightData}>
        <div className={classes.leftContainer}>
          <div className={classes.weightData}>
            <div>
              <div className={classes.value}>
                <span>{weight}</span>
                <span>kg</span>
              </div>
              <div className={classes.title}>Gewicht</div>
            </div>

            <div className={classes.difference}>
              <div className={classes.value}>
                <span>{weightDifference ?? "k.A"}</span>
                <span>{weightDifference && "kg"}</span>
              </div>
              <div className={classes.title}>Differenz</div>
            </div>
          </div>

          <div className={classes.kcalsData}>
            <div className={classes.kcalsDataContainer}>
              <div className={classes.title}>Gesamtkalorien</div>
              <div>
                {accumulatedKcals ?? "k.A"}
                <span> kcals</span>
              </div>
            </div>

            <div className={classes.kcalsDataContainer}>
              <div className={classes.title}>Kalorien Durchschnitt (24h)</div>
              <div>
                {dailyAverageCalories ?? "k.A"} <span>&#216;</span>
                <span>kcals</span>
              </div>
            </div>

            <div className={classes.kcalsDataContainer}>
              <div className={classes.title}>Kalorien Durchschnitt (1h)</div>
              <div>
                {hourlyAverageCalories ?? "k.A"} <span>&#216;</span>
                <span>kcals</span>
              </div>
            </div>

            <div className={classes.kcalsDataContainer}>
              <div className={classes.title}>Kalorien Durchschnitt (1min)</div>
              <div>
                {minutesAverageCalories ?? "k.A"} <span>&#216;</span>
                <span>kcals</span>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.rightContainer}>
          <WeightDate dateString={date} />
          <Button
            addedClasses={classes.deleteBtn}
            onClick={() => {
              setIsRemovingNewEntry(true);
            }}
          >
            löschen
          </Button>
        </div>
      </div>
    </>
  );
};

export default WeightData;
