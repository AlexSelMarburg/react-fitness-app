import { useState } from "react";
import classes from "./WeekNutritionSummary.module.css";
import { TbLayoutList } from "react-icons/tb";
import Button from "../UI/Button/Button";
import WeekSummaryModal from "../UI/Modals/WeekSummaryModal/WeekSummaryModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import { FaExclamationTriangle } from "react-icons/fa";
import InfoModal from "../UI/Modals/InfoModal/InfoModal";
import { MISSING_CALORIES_DATA_AVG_WARNING } from "../../helpers/modalMessages";

const WeekNutritionSummary = ({ title = "diese Woche", nutrition }) => {
  const [isWeekSummaryModalListOpen, setIsWeekSummaryModalListOpen] =
    useState(false);
  const [
    isMissingDataInformationModalOpen,
    setIsMissingDataInformationModalOpen,
  ] = useState(false);

  return (
    <>
      {isWeekSummaryModalListOpen && (
        <Backdrop>
          <WeekSummaryModal
            closeModal={() => setIsWeekSummaryModalListOpen(false)}
            nutrition={nutrition}
            title={title}
          />
        </Backdrop>
      )}

      {isMissingDataInformationModalOpen && (
        <Backdrop>
          <InfoModal
            information={MISSING_CALORIES_DATA_AVG_WARNING}
            onConfirm={() => {
              setIsMissingDataInformationModalOpen(false);
            }}
          />
        </Backdrop>
      )}

      <div className={classes.WeekNutritionSummary}>
        <div className={classes.leftContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.kcalsValue}>
              <div>{nutrition.accumulatedCaloriesAverage}</div>
              <div>&#216;</div>
              <div>kcals</div>
            </div>
            <div className={classes.title}>{title}</div>
          </div>
          <div className={classes.warningIconContainer}>
            {nutrition.hasMissingKcalsValues && (
              <FaExclamationTriangle
                className="warningIcon"
                onClick={() => {
                  setIsMissingDataInformationModalOpen(true);
                }}
              />
            )}
          </div>
        </div>

        <div className={classes.rightContainer}>
          <Button
            addedClasses="thumb-button"
            onClick={() => setIsWeekSummaryModalListOpen(true)}
          >
            <TbLayoutList />
          </Button>
        </div>
      </div>
    </>
  );
};

export default WeekNutritionSummary;
