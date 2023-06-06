import classes from "./PrevProcessedExercise.module.css";

const PrevProcessedExercise = ({ prevSessionSets }) => {
  const accVolume = prevSessionSets.reduce((acc, set) => {
    return acc + set.reps * set.weight;
  }, 0);

  return (
    <div className={classes.PrevProcessedExercise}>
      <div className={classes.title}>
        <span>letzte Session </span>
        <div className={classes.summary}>
          <span>volumen:</span>
          <span>{accVolume.toFixed(0)}</span>
        </div>
      </div>
      <div className={classes.setsContainer}>
        {prevSessionSets.map((set, index) => {
          const { reps, weight } = set;
          return (
            <div className={classes.set} key={index}>
              <div>
                <span>{index + 1}</span>.
              </div>
              <div>
                reps: <span>{reps}</span>
              </div>
              <div>
                <span>{weight}</span>kg
              </div>
              <div>
                <span>vol:</span> <span>{(reps * weight).toFixed(0)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrevProcessedExercise;
