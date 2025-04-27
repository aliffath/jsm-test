import React from "react";

const Button = ({ onClick, className, label }) => {
  return (
    <>
      <button onClick={onClick} className={`py-2 px-4 rounded-lg text-sm text-white font-medium cursor-pointer ${className}`}>
        {label}
      </button>
    </>
  );
};

export default Button;
