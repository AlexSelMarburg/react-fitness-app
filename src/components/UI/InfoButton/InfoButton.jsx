import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import InfoModal from "../Modals/InfoModal/InfoModal";

const InfoButton = ({ info }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openInfoModalHandler = () => {
    setIsInfoModalOpen(true);
  };

  return (
    <>
      {isInfoModalOpen && (
        <Backdrop>
          <InfoModal
            information={info}
            onConfirm={() => {
              setIsInfoModalOpen(false);
            }}
          />
        </Backdrop>
      )}

      <FaInfoCircle onClick={openInfoModalHandler} className="infoIcon" />
    </>
  );
};

export default InfoButton;
