import classes from "./NavBarColorPicker.module.css";
import { settingsActions } from "../../store/settings-slice";
import { useDispatch, useSelector } from "react-redux";

const NavBarColorPicker = () => {
  const dispatch = useDispatch();
  const navbarTheme = useSelector((state) => state.settings.navbarTheme);

  const changeNavbarTypeHandler = (themeName, e) => {
    dispatch(settingsActions.changeNavbarTheme(themeName));
  };

  return (
    <div className={classes.NavBarColorPicker}>
      <div className={classes.titleContainer}>
        <p>Farbe der Navigationsleiste</p>
      </div>
      <div className={classes.colorsContainer}>
        <button
          className={navbarTheme === "" ? classes.active : null}
          onClick={(e) => changeNavbarTypeHandler("", e)}
        ></button>
        <button
          className={
            navbarTheme === "navbarThemeAltOne" ? classes.active : null
          }
          onClick={(e) => changeNavbarTypeHandler("navbarThemeAltOne", e)}
        ></button>
        <button
          className={
            navbarTheme === "navbarThemeAltTwo" ? classes.active : null
          }
          onClick={(e) => changeNavbarTypeHandler("navbarThemeAltTwo", e)}
        ></button>
        <button
          className={
            navbarTheme === "navbarThemeAltThree" ? classes.active : null
          }
          onClick={(e) => changeNavbarTypeHandler("navbarThemeAltThree", e)}
        ></button>
      </div>
    </div>
  );
};

export default NavBarColorPicker;
