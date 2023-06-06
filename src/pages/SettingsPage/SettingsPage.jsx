import classes from "./SettingsPage.module.css";
import NavBarColorPicker from "../../components/NavBarColorPicker/NavBarColorPicker";
import LocalStorageManagement from "../../components/LocalStorageManagement/LocalStorageManagement";

const SettingsPage = () => {
  return (
    <section className={classes.SettingsPage}>
      <NavBarColorPicker />
      <LocalStorageManagement />
    </section>
  );
};

export default SettingsPage;
