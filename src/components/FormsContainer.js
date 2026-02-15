import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { signinUser, signupUser } from "../services/authService";
import { saveAuth } from "../services/authStorage";

function FormsContainer({ isActive, setIsActive }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupError, setSignupError] = useState("");
  const [signinError, setSigninError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {setEmail("");setName("");setPassword(""); setSignupError(""); setSigninError("");}, [isActive]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (!password.trim()) {
      setSignupError("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({name,username: email,password: password.trim(),});
      if (data.data?.message === "User created successfully") {
        setIsActive(true);
      }
       else {
        setSignupError(data.data?.message || "Signup failed");
      }
    } catch {
      setSignupError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
 const handleSignin = async (e) => { e.preventDefault(); setSigninError("");
  if (!password.trim()) {
    setSigninError("Password cannot be empty");
    return;
  }
  setLoading(true);
  try {
    const result = await signinUser({ username: email, password: password.trim(),});
    if (!result.success) { setSigninError(result.message); return;}
    saveAuth(result.data);
    navigate("/", { replace: true });

  } catch (err) {
    setSigninError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute top-1/2 transition-all duration-700 ease-in-out
        ${isActive ? "left-[12%]" : "left-[98%]"}
        -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-[5]`}
      >
        <form
          onSubmit={handleSignup}
          className={`transition-opacity duration-400
          ${isActive ? "opacity-0 pointer-events-none invisible z-[1]" : "opacity-100 visible z-[2]"}`}
        >
          <div
            className="
  w-[90%] max-w-[500px] lg:w-[400px] lg:mr-80
  p-9 rounded-[22px]
  bg-white/5 backdrop-blur-lg
  border border-white/40
  shadow-[0_25px_50px_rgba(0,0,0,0.18)]
"
          >
            <h2 className="text-xl lg:text-2xl text-[#0b2545] mb-1">
              Create Account
            </h2>
            <p className="mb-6 text-[#334e7d] font-medium">
              Start managing everything
            </p>

            <div
              className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60
            focus-within:border-[#39a1ff]
            focus-within:shadow-[0_0_0_3px_rgba(57,161,255,0.25)]"
            >
              <FontAwesomeIcon icon={faUser} />
              <input
                placeholder="Name"
                className="bg-transparent outline-none py-3 text-[#0b2545] text-sm lg:text-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                placeholder="Email"
                className="bg-transparent outline-none py-3 text-[#0b2545] text-sm lg:text-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none py-3 text-[#0b2545] text-sm lg:text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {signupError && (
              <p className="text-red-500 text-sm">{signupError}</p>
            )}

            <button
              disabled={loading}
              className="w-full mt-5 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]
              transition hover:-translate-y-[1px]
              hover:shadow-[0_10px_25px_rgba(57,161,255,0.45)]
              disabled:opacity-60 disabled:cursor-not-allowed text-sm lg:text-xl"
            >
              Sign Up
            </button>
          </div>
        </form>

        <form
          onSubmit={handleSignin}
          className={`transition-opacity duration-400 
          ${isActive ? "opacity-100 visible z-[2]" : "opacity-0 pointer-events-none invisible z-[1]"}`}
        >
          <div
            className="
  w-[90%] max-w-[500px] lg:w-[400px]
  p-9 rounded-[22px]
  bg-white/5 backdrop-blur-lg
  border border-white/40
  shadow-[0_25px_50px_rgba(0,0,0,0.18)]
"
          >
            <h2 className="text-xl lg:text-2xl text-[#0b2545] mb-1">
              Welcome Back
            </h2>
            <p className="mb-6 text-[#334e7d] font-medium text-sm lg:text-[1rem]">
              Sign in to continue
            </p>

            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                placeholder="Email"
                className="bg-transparent outline-none py-3 text-[#0b2545] text-sm lg:text-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none py-3 text-[#0b2545]text-sm lg:text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {signinError && (
              <p className="text-red-500 text-sm">{signinError}</p>
            )}
            <div className="text-right mt-2">
              <Link
                to="/forgotpassword"
                className="text-sm text-[#5f7cff] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              disabled={loading}
              className="w-full mt-5 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]  text-sm lg:text-xl"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default FormsContainer;
