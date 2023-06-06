import classes from "./CaloriesConsumptionCalculation.module.css";
import InfoButton from "../UI/InfoButton/InfoButton";
import { useState, useEffect } from "react";

import {
  calculateTotalDailyEnergyExpenditure,
  physicalActivityLevels,
  BMR_INFO,
  PAL_INFO,
  TEE_INFO,
} from "../../helpers/bodyDataCalculations";

const CaloriesConsumptionCalculation = ({
  BMR,
  palLevel,
  onPalOptionChange,
}) => {
  const [totalDailyEnergyExpenditure, setTotalDailyEnergyExpenditure] =
    useState(null);

  useEffect(() => {
    if (BMR && palLevel) {
      setTotalDailyEnergyExpenditure(
        calculateTotalDailyEnergyExpenditure(palLevel, BMR)
      );
    }
  }, [palLevel, BMR]);

  return (
    <div className={classes.CaloriesConsumptionCalculation}>
      <div className={classes.bmrTitle}>
        <h2 className={classes.dataLabel}>Kalorien-Grundumsatz:</h2>
        <InfoButton info={BMR_INFO} />
      </div>
      <div className={classes.bmrContainer}>
        <span className={classes.bmrValue}>{BMR}</span>
        <span className={classes.dataUnit}>kcal</span>(täglich)
      </div>

      <div className={classes.palSelect}>
        <div className={classes.palSelectInfo}>
          <h2 className={classes.dataLabel}>Aktivitätsniveau:</h2>
          <InfoButton info={PAL_INFO} />
        </div>
      </div>
      <div className={classes.palSelect}>
        <select
          value={palLevel ?? "Sitzend"}
          onChange={onPalOptionChange}
          name="Physical Activity Level"
        >
          {physicalActivityLevels.map((option, index) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={classes.totalExpenditure}>
          <div className={classes.teeSelectInfo}>
            <h2 className={classes.dataLabel}>Gesamtkalorienbedarf:</h2>
            <InfoButton info={TEE_INFO} />
          </div>
          <div>
            <span className={classes.teeValue}>
              {totalDailyEnergyExpenditure ?? "k.A"}
            </span>
            <span className={classes.dataUnit}>kcal</span>(täglich)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesConsumptionCalculation;
