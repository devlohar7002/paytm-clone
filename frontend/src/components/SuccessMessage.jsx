import React from "react";

function SuccessMessage({ label }) {
  return (
    <div className="w-full text-center text-sm px-2 border rounded-md bg-green-200 border-green-400 py-2 text-slate-600">
      {label}
    </div>
  );
}

export default SuccessMessage;
