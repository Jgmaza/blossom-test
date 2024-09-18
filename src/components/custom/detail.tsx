import React from "react";

interface DetailProps {
  label: string;
  value?: string;
}

const Detail = ({ label, value }: DetailProps) => {
  return (
    <div
      className="flex flex-col justify-center py-4"
      style={{ borderTop: "1px solid #f1f2f4" }}
    >
      <p className="text-gray-900 text-sm font-bold">{label}</p>

      <p className="text-gray-500 text-sm">{value}</p>
    </div>
  );
};

export default Detail;
