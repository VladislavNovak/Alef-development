import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {userInputList, TITLE} from '../../context/user/userInputNamesList';
import {capFirstLetter, inputValidation} from '../../utils/functions';

const Control = ({memberId: id, inputTitle, inputData, onInputChange}) => {

  const [isFocus, setFocus] = useState(inputData ? true : false);

  const handleInputFocus = ({target}, status) => {
    if (target.value) {
      status = true;
    }
    setFocus(status);
  };

  const handleInputChange = ({target: {name, value}}, id) => (
    (inputTitle === TITLE)
    ? inputValidation(name, value, id, onInputChange)
    : onInputChange(name, value, id)
  );

  return (
    <div className="control" >
      <label
        className={isFocus ? `control__label active` : `control__label`}
        htmlFor={inputTitle}>
          {capFirstLetter(userInputList[inputTitle].ru)}
      </label>
      <input
        type={userInputList[inputTitle].type}
        name={inputTitle}
        value={inputData}
        onChange={(evt) => handleInputChange(evt, id)}
        onFocus={(evt) => handleInputFocus(evt, true)}
        onBlur={(evt) => handleInputFocus(evt, false)}
        className="control__input"
        autoComplete="off"
        required />
    </div>
  );
};

Control.propTypes = {
  memberId: PropTypes.number,
  inputTitle: PropTypes.string,
  inputData: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};


export default Control;


