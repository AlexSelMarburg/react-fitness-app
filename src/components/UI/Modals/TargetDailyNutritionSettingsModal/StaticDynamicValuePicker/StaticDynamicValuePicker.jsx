import InfoButton from "../../../InfoButton/InfoButton";
import classes from "./StaticDynamicValuePicker.module.css";
import { TbSettings } from "react-icons/tb";
import Button from "../../../Button/Button";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { useState } from "react";
import NumPad from "../../../../NumPad/NumPad";
import Backdrop from "../../../Backdrop/Backdrop";

const StaticDynamicValuePicker = ({
  info,
  title,
  targetValue,
  lastKnownWeight,
  onToggleDynamicValue,
  increaseDynamicValue,
  decreaseDynamicValue,
  onSetStaticValue,
}) => {
  const { dynamicValue, staticValue, isUsingDynamicValue } = targetValue;
  const [isUsingNumpad, setIsUsingNumpad] = useState(false);

  const acceptNumPadValue = (value) => {
    onSetStaticValue(value);
    setIsUsingNumpad(false);
  };

  return (
    <>
      {isUsingNumpad && (
        <Backdrop>
          <NumPad
            maxIntegerDigits={3}
            onFloatingPoint={true}
            onAbort={() => setIsUsingNumpad(false)}
            onNewEntry={acceptNumPadValue}
          />
        </Backdrop>
      )}

      <div className={classes.StaticDynamicValuePicker}>
        <div className={classes.header}>
          <div className={classes.title}>
            <span>{title}</span> <span>(täglich)</span>
          </div>
          <InfoButton info={info} />
        </div>

        <div className={classes.optionsPickers}>
          <div className={classes.staticOption}>
            <div className={classes.optionPickerContainer}>
              <div
                className={`${classes.staticOptionPicker} ${
                  !isUsingDynamicValue ? classes.active : ""
                }`}
                onClick={() => onToggleDynamicValue(false)}
              ></div>
            </div>
            <div className={classes.optionTitle}>festen Wert nutzen</div>
          </div>

          <div className={`${classes.dynamicOption} ${classes.active}`}>
            <div className={classes.optionPickerContainer}>
              <div
                className={`${classes.dynamicOptionPicker} ${
                  isUsingDynamicValue ? classes.active : ""
                }`}
                onClick={() => onToggleDynamicValue(true)}
              ></div>
            </div>
            <div className={classes.optionTitle}>
              dynamisch, nach Körpegewicht
            </div>
          </div>
        </div>

        <div className={`${classes.staticOptionValue} ${classes.active}`}>
          <div
            className={`${classes.gramsValue} ${
              !isUsingDynamicValue ? classes.active : ""
            }`}
          >
            <div>
              {staticValue}
              <span>g</span>
            </div>
          </div>
          <div className={classes.actions}>
            <Button
              addedClasses="thumb-button"
              onClick={() => setIsUsingNumpad(true)}
              disabled={!isUsingDynamicValue ? false : true}
            >
              <TbSettings />
            </Button>
          </div>
        </div>
        <div className={`${classes.dynamicOptionValue} ${classes.active}`}>
          <div
            className={`${classes.gramsValue} ${
              isUsingDynamicValue ? classes.active : ""
            }`}
          >
            <div>
              {(lastKnownWeight * dynamicValue).toFixed()}
              <span>g</span>
            </div>
          </div>
          <div className={classes.actions}>
            <div
              className={`${classes.gramsPerBodyWeightValue} ${
                isUsingDynamicValue ? classes.active : ""
              }`}
            >
              <div>
                <span>{dynamicValue}</span>
                <span>(g/kg)</span>
              </div>
            </div>
            <div className={classes.buttons}>
              <Button
                addedClasses="thumb-button"
                onClick={() => increaseDynamicValue()}
                disabled={isUsingDynamicValue ? false : true}
              >
                <BsFillArrowUpSquareFill />
              </Button>
              <Button
                addedClasses="thumb-button"
                onClick={() => decreaseDynamicValue()}
                disabled={isUsingDynamicValue ? false : true}
              >
                <BsFillArrowDownSquareFill />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticDynamicValuePicker;
