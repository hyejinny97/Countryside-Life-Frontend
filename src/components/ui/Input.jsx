import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classname from "classnames";

function Input({
  type,
  name,
  label,
  initialValue,
  maxLength,
  getValue,
  helpText,
  invalidTexts,
  placeholder,
  left,
  right,
  handleLeftClick,
  handleRightClick,
  className,
  clear,
  disabled,
  newValue,
  required,
}) {
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    if (clear) setValue("");
  }, [clear]);

  useEffect(() => {
    if (newValue) setValue(newValue);
  }, [newValue]);

  const inputClassName = classname("Input__input", {
    "Input__input--red":
      invalidTexts && invalidTexts.length >= 1 && (!left || !right),
    "Input__input--no-line": left || right,
    "Input__input--left-gap": left,
    "Input__input--right-gap": right,
  });

  const inputContainerClassName = classname("Input__input-container", {
    "Input__input-container--no-line": !left && !right,
  });

  const renderValidTexts = invalidTexts?.map((text) => {
    return (
      <p key={text} className="Input__invalid-text">
        {text}
      </p>
    );
  });

  return (
    <div className={`Input ${className}`}>
      {label && (
        <label className="Input__label" htmlFor={label}>
          {label}
        </label>
      )}
      {helpText && <p className="Input__help-text">{helpText}</p>}
      <div className={inputContainerClassName}>
        <div className="Input__input-left" onClick={handleLeftClick}>
          {left}
        </div>
        <input
          className={inputClassName}
          type={type}
          id={label}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={(e) => {
            if (e.target.value.length > maxLength) return;
            setValue(e.target.value);
            getValue && getValue(e.target.value);
          }}
          disabled={disabled}
          required={required}
        />
        <div className="Input__input-right" onClick={handleRightClick}>
          {right}
        </div>
      </div>
      {renderValidTexts}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(["text", "password", "email"]),
  name: PropTypes.string,
  label: PropTypes.string,
  helpText: PropTypes.string,
  invalidTexts: PropTypes.array,
  placeholder: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
