import classes from "./ProcessedSessionsPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProcessedSession from "../../components/ProcessedSession/ProcessedSession";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../../components/UI/Button/Button";

const ProcessedSessionsPage = () => {
  const { sessionID } = useParams();
  const { name, processedSessions, templateExercises } = useSelector(
    (state) => state.workout[sessionID]
  );
  const navigate = useNavigate();


  return (
    <section className={classes.ProcessedSessionsPage}>
      <div className={classes.processedSessionHeader}>
        <div>
          <div className={classes.processedSessionsTitle}>{name}</div>
          <div className={classes.processedSessionDescription}>
            abgearbeitete Sessions
          </div>
        </div>
        <div className={classes.actions}>
          <Button onClick={() => navigate(-1)} addedClasses="thumb-button">
            <FaSignOutAlt />
          </Button>
        </div>
      </div>
      <div className={classes.processedSessions}>
        {processedSessions.map((session, index) => (
          <ProcessedSession
            session={session}
            key={index}
            templateSessionID={sessionID}
          />
        ))}
      </div>
    </section>
  );
};

export default ProcessedSessionsPage;
