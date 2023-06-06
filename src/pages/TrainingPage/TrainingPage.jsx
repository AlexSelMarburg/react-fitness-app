import { useState, useRef } from "react";
import classes from "./TrainingPage.module.css";
import { useSelector } from "react-redux";
import Button from "../../components/UI/Button/Button";
import CreateSessionTemplateModal from "../../components/UI/Modals/CreateSessionTemplateModal/CreateSessionTemplateModal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import SwiperCarousel from "../../components/SwiperCarousel/SwiperCarousel";

const TrainingPage = () => {
  const workout = useSelector((state) => state.workout);
  const [isCreatingNewSession, setIsCreatingNewSession] = useState(false);

  let content;
  if (!isCreatingNewSession && Object.keys(workout).length === 0) {
    content = (
      <p className="highlight-text">
        Es sind noch keine Sessionvorlagen angelegt worden!
      </p>
    );
  } else {
    const sessionsArray = Object.values(workout);
    content = <SwiperCarousel slides={sessionsArray} />;
  }

  return (
    <>
      {isCreatingNewSession && (
        <Backdrop>
          <CreateSessionTemplateModal
            onAbbort={() => setIsCreatingNewSession(false)}
          />
        </Backdrop>
      )}
      <section className={classes.TrainingPage}>
        <div className={classes.contentContainer}>{content}</div>

        <div className={classes.actions}>
          <Button
            onClick={() => setIsCreatingNewSession(true)}
            addedClasses={classes.newEntryBtn}
          >
            Sessionvorlage erstellen{" "}
          </Button>
        </div>
      </section>
    </>
  );
};

export default TrainingPage;
