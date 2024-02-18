import React from "react";

function Balance({ value }) {
  return (
    <div className="flex items-center border shadow  rounded p-4">
      <div className="text-2xl font-semibold">Your Balance:</div>
      <div className="text-2xl ml-4">$ {value}</div>
    </div>
  );
}

export default Balance;
