import classes from "./Profile.module.css";
import Card from "../UI/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { differenceInYears } from "date-fns";
import {
  calculateBMI,
  calculateBMR,
  getBmiStatus,
  BMI_INFO,
} from "../../helpers/bodyDataCalculations";
import CaloriesConsumptionCalculation from "../CaloriesConsumptionCalculation/CaloriesConsumptionCalculation";
import { profileActions } from "../../store/profile-slice";
import InfoButton from "../UI/InfoButton/InfoButton";

const Profile = () => {
  const {
    firstName,
    lastName,
    height,
    gender,
    bodyWeight,
    birthDate,
    palLevel,
  } = useSelector((state) => state.profile);
  const bodyWeights = useSelector((state) => state.bodyWeights);
  const dispatch = useDispatch();

  const age = differenceInYears(new Date(), new Date(birthDate));
  const lastKnownWeight = bodyWeights?.[0]?.weight ?? bodyWeight;
  const BMI = lastKnownWeight
    ? calculateBMI(lastKnownWeight, height)
    : calculateBMI(bodyWeight, height);

  const BMI_status = getBmiStatus(BMI, gender);
  const BMR = calculateBMR(gender, lastKnownWeight, height, age).toFixed();

  const onPalOptionChangeHandler = (event) => {
    dispatch(profileActions.updatePAL(event.target.value));
    event.target.blur();
  };

  return (
    <Card>
      <div className={classes.Profile}>
        <h1 className={classes.name}>
          {firstName} {lastName}
        </h1>
        <div className={classes.profileData}>
          <div>
            <h2 className={classes.dataLabel}>körpergröße:</h2>
            <span className={classes.dataValue}>{height}</span>
            <span className={classes.dataUnit}>cm</span>
          </div>
          <div>
            <h2 className={classes.dataLabel}>gewicht:</h2>
            <span className={classes.dataValue}>{lastKnownWeight}</span>
            <span className={classes.dataUnit}>kg</span>
          </div>
          <div>
            <h2 className={classes.dataLabel}>alter:</h2>
            <span className={classes.dataValue}>{age}</span>
          </div>

          <div>
            <h2 className={classes.dataLabel}>geschlecht:</h2>
            {gender === "male" ? (
              <BsGenderMale className={classes.genderIcon} />
            ) : (
              <BsGenderFemale className={classes.genderIcon} />
            )}
          </div>
        </div>
        <div className={classes.bmiData}>
          <div>
            <h2 className={classes.dataLabel}>BMI:</h2>
            <span className={classes.dataValue}>{BMI}</span>
            <InfoButton info={BMI_INFO} />
          </div>
          <div className={classes.bmiStatus}>{BMI_status}</div>
        </div>

        <CaloriesConsumptionCalculation
          BMR={BMR}
          palLevel={palLevel}
          onPalOptionChange={onPalOptionChangeHandler}
        />
        <div className={classes.footer}></div>
      </div>
    </Card>
  );
};

export default Profile;
