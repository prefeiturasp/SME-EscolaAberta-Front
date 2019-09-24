import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const ToggleExpandir = props => {
  const { onClick, ativo } = props;
  return (
    <span onClick={onClick} className="toggle-expandir">
      {ativo ? (
        <FontAwesomeIcon icon={faChevronUp} />
      ) : (
        <FontAwesomeIcon icon={faChevronDown} />
      )}
    </span>
  );
};

export default ToggleExpandir;
