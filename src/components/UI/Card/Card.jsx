import classes from "./Card.module.css";

const Card = ({ neuEffect = true, children, className = "" }) => {
  return (
    <div
      className={`${classes.Card} ${
        neuEffect && classes.neuEffect
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
