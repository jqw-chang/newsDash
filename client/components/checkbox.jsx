import React, { Component } from 'react';

function Checkbox({ label, handleCheckboxChange, isChecked}) {

  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          value={label}
          onChange={() => isChecked = handleCheckboxChange(label, isChecked)}
        />

        {label}
      </label>
    </div>
  );
}

export default Checkbox;