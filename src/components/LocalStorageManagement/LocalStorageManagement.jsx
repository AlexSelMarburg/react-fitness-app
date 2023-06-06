import classes from "./LocalStorageManagement.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import ConfirmationModal from "../UI/Modals/ConfirmationModal/ConfirmationModal";
import { bodyWeightsActions } from "../../store/bodyWeights-slice";
import { nutritionActions } from "../../store/nutrition-slice";
import { workoutActions } from "../../store/workout-slice";

const LocalStorageManagement = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    onConfirm: null,
    infoMsg: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAllStorageDataHandler = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const deleteAllBodyWeightDataHandler = () => {
    dispatch(bodyWeightsActions.reset());
  };

  const deleteAllNutritionDataHandler = () => {
    dispatch(nutritionActions.reset());
  };

  const deleteAllWorkoutDataHandler = () => {
    dispatch(workoutActions.reset());
  };

  const openConfirmationModal = (onConfirm, infoMsg) => {
    setIsConfirmationModalOpen(true);
    setModalConfig({ onConfirm, infoMsg });
  };

  return (
    <>
      {isConfirmationModalOpen && (
        <Backdrop>
          <ConfirmationModal
            onAbort={() => {
              setIsConfirmationModalOpen(false);
            }}
            onConfirm={() => {
              modalConfig.onConfirm();
              setIsConfirmationModalOpen(false);
            }}
            infoMsg={modalConfig.infoMsg}
          />
        </Backdrop>
      )}
      <div className={classes.LocalStorageManagement}>
        <div className={classes.container}>
          <div className={classes.title}>Körpergewicht-daten löschen!</div>
          <div className={classes.actions}>
            <div className={classes.description}>
              Alle Wiegungen (Körpergewicht) werden gelöscht!
            </div>
            <Button
              addedClasses="thumb-button"
              onClick={() =>
                openConfirmationModal(
                  deleteAllBodyWeightDataHandler,
                  "Soll der Vorgang wircklich ausgefährt werden? Dadurch werden alle Wiegungen (Körpergewicht) gelöscht werden!"
                )
              }
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.title}>Ernährungs-daten löschen!</div>
          <div className={classes.actions}>
            <div className={classes.description}>
              Alle Nährwert-daten werden gelöscht!
            </div>
            <Button
              addedClasses="thumb-button"
              o
              onClick={() =>
                openConfirmationModal(
                  deleteAllNutritionDataHandler,
                  "Soll der Vorgang wircklich ausgefährt werden? Dadurch werden alle Nährwert-daten gelöscht werden!"
                )
              }
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.title}>Workout-daten löschen!</div>
          <div className={classes.actions}>
            <div className={classes.description}>
              Alle Workout-daten werden gelöscht!
            </div>
            <Button
              addedClasses="thumb-button"
              o
              onClick={() =>
                openConfirmationModal(
                  deleteAllWorkoutDataHandler,
                  "Soll der Vorgang wircklich ausgefährt werden? Dadurch werden alle Workout-daten gelöscht werden!"
                )
              }
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.title}>ALLE Daten löschen!</div>
          <div className={classes.actions}>
            <div className={classes.description}>
              Alle Daten werden gelöscht und die App auf den Ausgangszustand
              zurückgesetzt!
            </div>
            <Button
              addedClasses="thumb-button"
              onClick={() =>
                openConfirmationModal(
                  deleteAllStorageDataHandler,
                  "Soll der Vorgang wircklich ausgefährt werden? Dadurch werden ALLE Daten unwiederbringlich gelöscht und die App auf den Ausgangszustand zuräckgesetzt!"
                )
              }
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalStorageManagement;
