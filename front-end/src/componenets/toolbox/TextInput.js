import React from "react";

const TextInput = ({ name, label, onChange, placeHolder, value, error }) => {
  let wrappedClass = "form-group";
  if (error && error.length > 0) {
    wrappedClass += " has-error";
  }

  return (
    <div className={wrappedClass}>
      <label htmlFor={name}></label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
        ></input>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
