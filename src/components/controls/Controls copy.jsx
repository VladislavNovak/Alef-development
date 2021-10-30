/* eslint-disable react/prop-types */
import React from 'react';
import {Control} from '..';

const allowed = [`title`, `age`];

const Controls = ({userFieldsX, onControlsChange, onRemove}) => {

  const handleInputChange = ({target: {name, value}}) => {
    // console.log(`in Block - name, value: `, {name, value});
    // console.log(`in Block - id: `, userFieldsX.id);
    onControlsChange(name, value, userFieldsX.id);
  };

  return (
    <ul>{
      Object.keys(userFieldsX).filter(key => allowed.includes(key)).map(key => (
        <Control
          key={key}
          inputTitle={key}
          inputData={userFieldsX[key]}
          onInputChange={handleInputChange} />
      ))
    }
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => onRemove(userFieldsX.id)} >Удалить</button>
    </ul>
  );
};

export default Controls;
