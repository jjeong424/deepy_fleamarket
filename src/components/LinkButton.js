import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Button.css";



function LinkButton(link, id) {
  return (
      <div className="Button">
        <button>
            <Link to={link}>{id}</Link>
        </button>
      </div>
  );
}

LinkButton.propTypes = {
    link: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

export default LinkButton;