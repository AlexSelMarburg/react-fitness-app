import classes from "./CreateSessionTemplateModal.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "../../Button/Button";
import InfoButton from "../../InfoButton/InfoButton";
import { workoutActions } from "../../../../store/workout-slice";
import { SessionTemplate } from "../../../../helpers/workoutClasses";

const CreateSessionTemplateModal = ({ onAbbort }) => {
  const dispatch = useDispatch();
  const sessionNameInputRef = useRef();

  const createNewSessionTemplate = () => {
    const name = sessionNameInputRef.current.value;
    if (name.trim() === "") {
      return;
    }

    dispatch(workoutActions.addSessionTemplate(new SessionTemplate(name)));
    onAbbort();
  };

  const info = (
    <p>
      Ein Workout besteht aus Sessionvorlagen, die wiederum aus Übungen
      bestehen. Ein Beispiel für eine Sessionvorlage wäre{" "}
      <span className="highlight-text">Oberkörper A</span> oder{" "}
      <span className="highlight-text">Unterkörper A</span>
    </p>
  );

  return (
    <div className={classes.newSessionContainer}>
      <div className={classes.newSessionTitle}>
        <span>Neue Sessionvorlage erstellen</span>
        <InfoButton info={info} />
      </div>
      <form
        className={classes.newSessionForm}
        onSubmit={(e) => e.preventDefault(e)}
      >
        <label htmlFor="name">Sessionname:</label>
        <input type="text" id="name" maxLength="24" ref={sessionNameInputRef} />
        <div className={classes.actions}>
          <Button onClick={onAbbort}>abbrechen</Button>
          <Button onClick={createNewSessionTemplate}>erstellen</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionTemplateModal;
