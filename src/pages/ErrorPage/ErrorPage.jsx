import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <section className={classes.ErrorPage}>
      <p className="danger-text">Ups! Irgendetwas ist schief gelaufen!</p>
    </section>
  );
};

export default ErrorPage;
