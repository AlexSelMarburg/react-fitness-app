import classes from "./Navigation.module.css";
import { FaWeight, FaPizzaSlice } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { IoPerson, IoSettingsSharp } from "react-icons/io5";
import NavigationListItem from "./NavigationListItem/NavigationListItem";

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <ul>
        <NavigationListItem to="/" text="Ernäh." icon={<FaPizzaSlice />} />
        <NavigationListItem to="/weight" text="Gew." icon={<FaWeight />} />
        <NavigationListItem to="/training" text="Gym" icon={<GiBiceps />} />
        <NavigationListItem to="/profil" text="Profil" icon={<IoPerson />} />
        <NavigationListItem
          to="/settings"
          text="Set."
          icon={<IoSettingsSharp />}
        />
      </ul>
    </nav>
  );
};

export default Navigation;
