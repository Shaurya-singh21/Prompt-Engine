import React from "react";
import { CircleCheck } from "lucide-react";

function Alert({ showAlert , desc}) {

  const show = showAlert ;

  return (
    <>
      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        transition-all duration-500 ease-in-out
        ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}>
        {/* Toast Notification */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-green-800/10 to-cyan-800/10 ring-1 ring-green-700 shadow-lg">
          <div className="flex-col justify-center">
            <div className="text-2xl flex items-center justify-center text-green-300 font-semibold">
              <CircleCheck className="w-5 h-5 text-green-300 mr-2" />
              Success
            </div>
            <div className="text-lg text-green-300">
              {desc}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay + Blur */}
      {show && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md transition-opacity duration-500" />
      )}
    </>
  );
}

export default Alert;
