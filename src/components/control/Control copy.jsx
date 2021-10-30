/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {capFirstLetter} from '../../utils/functions';

const Control = ({inputTitle, inputData, onInputChange}) => {

  const [isFocus, setFocus] = useState(false);

  // console.log(`inputData: `, inputData);

  const handleInputFocus = ({target}, status) => {
    if (target.value) {
      status = true;
    }
    setFocus(status);
  };

  return (
    <li className="control" key={inputTitle} >
      <label className={isFocus ? `control__label active` : `control__label`} htmlFor={inputTitle}>{capFirstLetter(inputTitle)}</label>
      <input
        type="text"
        name={inputTitle}
        value={inputData}
        onChange={onInputChange}
        onFocus={(evt) => handleInputFocus(evt, true)}
        onBlur={(evt) => handleInputFocus(evt, false)}
        className="control__input"
        autoComplete="off"
        required />
    </li>
  );
};

export default Control;


