import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {userInputNamesList, userInputNamesListRU} from '../../context/user/userInputNamesList';
import {capFirstLetter} from '../../utils/functions';

const checkFocus = (value) => (
  value ? true : false
);

const Control = ({memberId: id, inputTitle, inputData, onInputChange}) => {

  const [isFocus, setFocus] = useState(checkFocus(inputData));

  const handleInputFocus = ({target}, status) => {
    if (target.value) {
      status = true;
    }
    setFocus(status);
  };

  return (
    <div className="control" >
      <label
        className={isFocus ? `control__label active` : `control__label`}
        htmlFor={inputTitle}>
          {capFirstLetter(userInputNamesListRU[inputTitle])}
      </label>
      <input
        type={inputTitle === userInputNamesList[1] ? `number` : `text`}
        name={inputTitle}
        value={inputData}
        onChange={(evt) => onInputChange(evt, id)}
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


