import React from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return <i className={`fa-solid fa-spinner fa-spin text-purple-700 ${className}`}></i>;
};

export default Spinner;
