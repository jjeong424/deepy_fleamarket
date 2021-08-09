import React from "react";
import PropTypes from "prop-types";
import "./InputBox.css";



function InputBox({inputData, type, value}) {
  return (
        <div className="LoginForm">
          <div className="InputData">
          {inputData}
          </div>
        <input type={type} value={value} className="InputBox"/>
        </div>
      
  );
}

InputBox.propTypes = {
    inputData: PropTypes.string.isRequired
  };

export default InputBox;