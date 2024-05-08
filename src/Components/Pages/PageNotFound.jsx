import React from "react";
import image from "../../assets/notfound.jpg";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div
      className="bg-center bg-no-repeat bg-contain w-screen h-screen relative"
      style={{ backgroundImage: `url(${image})` }}
    >
        <Link to="/" className="bg-slate-900 rounded-md text-white p-2 absolute left-1/2 top-1/2 hover:no-underline">Back to home</Link>
    </div>
  );
};
