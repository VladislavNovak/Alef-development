/* eslint-disable react/prop-types */
import React, {Fragment} from 'react';
import {Control} from '..';
import {userInputNamesList} from '../../context/user/userInputNamesList';

const Controls = ({entry, onInputChange, onRemove}) => {

  const renderDeleteButton = () => (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={() => onRemove(entry.id)} >Удалить</button>
  );

  return (
    <Fragment>
      {Object.keys(entry).filter(key => userInputNamesList.includes(key)).map(key => (
        <Control
          key={key}
          memberId={entry.id}
          inputTitle={key}
          inputData={entry[key]}
          onInputChange={onInputChange} />
      ))}
      {entry.id ? renderDeleteButton() : null}
    </Fragment>
  );
};

export default Controls;
