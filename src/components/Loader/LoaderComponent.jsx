import React from "react";
import Loader from "react-loader-spinner";
export const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader type="Puff" color="#00BFFF" height={550} width={80}  />
    </div>
  );
};
