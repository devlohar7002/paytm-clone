import React from "react";

function Appbar({ label }) {
  return (
    <div className="flex items-center justify-around shadow-md bg-gray-900 text-slate-200 h-14">
      <div className="text-xl font-semibold">Payment Demo</div>

      <div className="flex items-center justify-center gap-4">
        <span>Hello, {label}</span>
        <span className="flex text-center item-center justify-center rounded-full text-gray-900 bg-gray-200 h-8 w-8 hover:scale-105">
          <div className="flex flex-col justify-center">
            {label[0].toUpperCase()}
          </div>
        </span>
      </div>
    </div>
  );
}

export default Appbar;
