import React from "react";

function ErrorMessage({ label }) {
  return (
    <div className="w-full text-center text-sm px-2 border rounded-md bg-red-200 border-red-400 py-2 text-slate-600">
      {label}
    </div>
  );
}

export default ErrorMessage;
