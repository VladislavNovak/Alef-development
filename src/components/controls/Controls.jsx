/* eslint-disable react/prop-types */
import React from 'react';
import {Control} from '..';

const allowed = [`title`, `age`];

const Controls = ({userFieldsX, onInputChange, onRemove}) => {
  console.log(userFieldsX);
  return (
    <ul>{
      Object.keys(userFieldsX).filter(key => allowed.includes(key)).map(key => (
        <Control
          key={key}
          inputTitle={key}
          inputData={userFieldsX[key]}
          onInputChange={onInputChange} />
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
