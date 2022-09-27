import React from "react";
import Logo from "../../assets/letduiLogo.svg";

export const Heading = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-indigo-700  capitalize text-center">
          - Welcome to -
        </h1>
        <img className="w-44" src={Logo} alt="letdui-app" />
      </div>
      <p className="text-center text-sm">Admin your projects</p>
    </>
  );
};
