import React from "react";
import Log from "../components/Log";

const Profil = () => {
  return (
    <div>
      <div className="profil-page">
        <div className="log-container">
          <Log signin={true} signup={false} />
          <div className="img-container">
          <img src="./img/log.svg" alt="Logo Marvel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
