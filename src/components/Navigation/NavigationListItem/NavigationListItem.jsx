import classes from "./NavigationListItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationListItem = ({ text, to, icon }) => {
  return (
    <li className={classes.NavigationListItem}>
      <NavLink
        className={({ isActive }) => (isActive ? classes.activeLink : null)}
        to={to}
      >
        {icon}
      </NavLink>
      <span>{text}</span>
    </li>
  );
};

export default NavigationListItem;
