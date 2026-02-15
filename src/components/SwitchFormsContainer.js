import React from "react";

const SwitchFormsContainer = ({ handleClick, isActive }) => {
  return (
<section className="absolute inset-0 pointer-events-none">

      <div
        className="
          lg:hidden
          absolute top-6 left-1/2 -translate-x-1/2
          w-full flex justify-center
          px-6
          z-[20]
        "
      >
        {!isActive ? (
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-blue-950">
              Already a member?
            </h3>
            <p className="text-sm font-medium mt-2">
              Please sign in to access your account
            </p>
            <button
              onClick={handleClick}
              className="
                mt-4 w-[130px] h-[36px]
                rounded-full
                border border-blue-950
                font-semibold text-sm
                transition hover:bg-[#3490e3]
              "
            >
              Sign in
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-blue-950">
              Not a member?
            </h3>
            <p className="text-sm font-medium mt-2">
              Please sign up to unlock the content.
            </p>
            <button
              onClick={handleClick}
              className="
                mt-4 w-[130px] h-[36px]
                rounded-full
                border border-blue-950
                font-semibold text-sm
                transition hover:bg-[#3490e3]
              "
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      
      <div className="hidden lg:grid grid-cols-2 h-full">

        <div
          className={`
            flex flex-col items-end justify-around text-center
            px-16 py-12
            ${isActive ? "pointer-events-none" : "pointer-events-auto"}
          `}
        >
          <div
            className={`
              text-white transition-all duration-600
              ${isActive ? "opacity-0 -translate-x-12" : "opacity-100 translate-x-0"}
            `}
          >
            <h3 className="text-[2.7rem] font-extrabold">
              Already a member?
            </h3>
            <p className="text-[1.2rem] font-semibold my-4">
              Please sign in to access your account
            </p>
            <button
              onClick={handleClick}
              className="
                w-[150px] h-[41px]
                rounded-full
                border border-white
                font-semibold
                transition hover:bg-[#3490e3]
              "
            >
              Sign in
            </button>
          </div>

          <img
            src="images/dashboard.svg"
            alt="Sign in"
            className={`
              w-full scale-[0.85]
              transition-transform duration-[1100ms]
              ${isActive ? "-translate-x-[800px]" : "translate-x-0"}
            `}
          />
        </div>
        <div
          className={`
            flex flex-col items-start justify-around text-center
            px-16 py-12
            ${isActive ? "pointer-events-auto" : "pointer-events-none"}
          `}
        >
          <div
            className={`
              text-white transition-all duration-600
              ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
            `}
          >
            <h3 className="text-[2.7rem] font-extrabold">
              Not a member?
            </h3>
            <p className="text-[1.2rem] font-semibold my-4">
              Please sign up to unlock the content.
            </p>
            <button
              onClick={handleClick}
              className="
                w-[150px] h-[41px]
                rounded-full
                border border-white
                font-semibold
                transition hover:bg-[#3490e3]
              "
            >
              Sign up
            </button>
          </div>

          <img
            src="images/lockedDashoboard.svg"
            alt="Sign up"
            className={`
              w-full scale-[0.85]
              transition-transform duration-[1100ms]
              ${isActive ? "translate-x-0" : "translate-x-[800px]"}
            `}
          />
        </div>
      </div>
    </section>
  );
};

export default SwitchFormsContainer;
