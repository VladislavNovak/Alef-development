import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Control} from '..';
import {userInputNamesList} from '../../context/user/userInputNamesList';

const Controls = ({entry, onInputChange, onRemove}) => {

  const renderDeleteButton = () => (
    <button
      type="button"
      className="children__btn-delete"
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

Controls.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    age: PropTypes.string,
  }),
  onInputChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

export default Controls;
