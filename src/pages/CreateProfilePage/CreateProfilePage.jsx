import RangeSlider from "../../components/UI/RangeSlider/RangeSlider";
import classes from "./CreateProfilePage.module.css";
import { useState } from "react";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import { isBefore, differenceInCalendarYears } from "date-fns";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { bodyWeightsActions } from "../../store/bodyWeights-slice";

const CreateProfilePage = () => {
  const [heightValue, setHeightValue] = useState(175);
  const [bodyWeightValue, setBodyWeightValue] = useState(80);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [birthDate, setBirthDate] = useState("2000-01-01");

  const dispatch = useDispatch();

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const heightValueHandler = (value) => {
    setHeightValue(value);
  };

  const bodyWeightValueHandler = (value) => {
    setBodyWeightValue(value);
  };

  const genderChangeHandler = (e) => {
    setGender(e.target.value);
  };

  const birthDateChangeHandler = (e) => {
    setBirthDate(e.target.value);
  };

  const createProfileHandler = () => {
    dispatch(
      profileActions.create({
        firstName: firstName,
        lastName: lastName,
        height: heightValue,
        bodyWeight: bodyWeightValue,
        gender: gender,
        birthDate: birthDate,
        palLevel: "mäßig aktiv",
        profileCreationDate: new Date(),
      })
    );

    dispatch(
      bodyWeightsActions.addNewEntry({
        weight: bodyWeightValue,
        date: new Date(),
      })
    );
  };

  const isFormValid =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    isBefore(new Date(birthDate), new Date()) &&
    differenceInCalendarYears(new Date(), new Date(birthDate)) <= 100;

  return (
    <section className={classes.CreateProfilePage}>
      <div className={classes.title}>
        Die Nutzung der App erfordert die Erfassung einiger Daten!
      </div>
      <Card>
        <form className={classes.CreateProfileForm}>
          <div className={classes.nameInputs}>
            <div className={classes.formControl}>
              <label htmlFor="firstName">Vorname:</label>
              <input
                maxLength={15}
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={firstNameChangeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label htmlFor="lastName">Nachname:</label>
              <input
                maxLength={15}
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={lastNameChangeHandler}
              />
            </div>
          </div>

          <div className={classes.birthDatePicker}>
            <label htmlFor="birthDate">Geburtsdatum:</label>
            <input
              name="birthDate"
              id="birthDate"
              type="date"
              onChange={birthDateChangeHandler}
              value={birthDate}
            />
          </div>

          <div className={classes.genderSelection}>
            <p>Geschlecht:</p>
            <div className={classes.genderSelect}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={genderChangeHandler}
              />
              <label htmlFor="male">männlich </label>
            </div>

            <div className={classes.genderSelect}>
              <input
                type="radio"
                checked={gender === "female"}
                id="female"
                name="gender"
                onChange={genderChangeHandler}
                value="female"
              />

              <label htmlFor="female">weiblich</label>
            </div>
          </div>

          <RangeSlider
            min={145}
            max={220}
            label="körpergrösse"
            unit="cm"
            name="height"
            step={1}
            value={heightValue}
            onChange={heightValueHandler}
          />
          <RangeSlider
            min={45}
            max={145}
            label="gewicht"
            unit="kg"
            name="bodyWeight"
            step={1}
            value={bodyWeightValue}
            onChange={bodyWeightValueHandler}
          />
          <div className={classes.formActions}>
            <Button onClick={createProfileHandler} disabled={!isFormValid}>
              Profil erstellen
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default CreateProfilePage;
