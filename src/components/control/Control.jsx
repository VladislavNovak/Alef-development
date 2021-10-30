/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {userInputNamesListRU} from '../../context/user/userInputNamesList';
import {capFirstLetter} from '../../utils/functions';

const Control = ({memberId: id, inputTitle, inputData, onInputChange}) => {

  const [isFocus, setFocus] = useState(false);

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
        type="text"
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

export default Control;


