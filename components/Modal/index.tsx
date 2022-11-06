import { FunctionComponent, useContext } from "react";
// import { UIContext } from "../../useUI";

// import GameOverModal from "./GameOverModal";
// import RestartModal from "./RestartModal";

const Modals:FunctionComponent = () => {
    //UI Context
    // const {showGameOverModal, setShowGameOverModal, showRestartModal, setShowRestartModal} = useContext(UIContext);


    return (
        <>
            {/* <GameOverModal
                showModal={showGameOverModal}
                setShowModal={setShowGameOverModal}
                />
            <RestartModal
                showModal={showRestartModal}
                setShowModal={setShowRestartModal}
                /> */}
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;