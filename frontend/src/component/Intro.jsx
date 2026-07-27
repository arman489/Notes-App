import React from "react";
import { Atom } from "react-loading-indicators";

function Intro() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px] top-20 right-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center">

        {/* Logo */}
        <div className="w-32 h-32 rounded-full border-4 border-blue-400 flex items-center justify-center shadow-[0_0_50px_#3b82f6] animate-bounce">

          <h1 className="text-6xl font-black text-white">
            A
          </h1>

        </div>

        {/* Name */}
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-widest text-white animate-pulse">
          ARMAN
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-blue-300 tracking-[8px] uppercase text-sm md:text-lg">
          MERN STACK DEVELOPER
        </p>

        {/* Loading */}
        <div className="mt-10">
          <Atom
            color="#3B82F6"
            size="large"
          />
        </div>

        {/* Footer */}
        <p className="mt-10 text-gray-400 text-sm animate-pulse">
          Building Modern Web Experiences
        </p>

      </div>

    </div>
  );
}

export default Intro;