import { useState } from "react";
import InfoModal from "../UI/Modals/InfoModal/InfoModal";
import classes from "./WarningsCollectionDisplay.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
import Backdrop from "../UI/Backdrop/Backdrop";

const WarningsCollectionDisplay = ({ warningInfosArray }) => {
  const [isWarningInfoOpen, setIsWarningInfoOpen] = useState(false);
  const [warning, setWarning] = useState(null);

  const openWarningInfoHandler = (warning) => {
    setWarning(warning);
    setIsWarningInfoOpen(true);
  };

  return (
    <>
      {isWarningInfoOpen && (
        <Backdrop>
          <InfoModal
            information={warning}
            onConfirm={() => {
              setIsWarningInfoOpen(false);
              setWarning(null);
            }}
          />
        </Backdrop>
      )}
      <div className={classes.WarningsCollectionDisplay}>
        {warningInfosArray.map((warningInfo, index) => (
          <FaExclamationTriangle
            key={index}
            className="warningIcon"
            onClick={() => {
              openWarningInfoHandler(warningInfo);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default WarningsCollectionDisplay;
