import classes from "./Layout.module.css";
import Navigation from "../../Navigation/Navigation";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { navbarDisabled } = useSelector((state) => state.settings);

  return (
    <>
      <main className={classes.main}>{children}</main>
      {!navbarDisabled && <Navigation />}
    </>
  );
};

export default Layout;
