import React, {useContext} from 'react';
import {AlertContext} from '../../context/alert/alertContext';

const Alert = () => {
  const {alert} = useContext(AlertContext);

  return (
    <div className="alert-wrapper">
      <div className={`alert alert--${alert.style}`}>
        <span>{alert.msg}</span>
      </div>
    </div>
  );
};

export default Alert;
