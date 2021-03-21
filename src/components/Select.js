import React from 'react';

const Select = ({ optionAmount, ...rest }) => {
  return (
    <select {...rest}>
      {Array.from(Array(optionAmount)).map((el, index) => (
        <option value={index + 1} key={index}>
          {index + 1}
        </option>
      ))}
    </select>
  );
};

export default Select;
