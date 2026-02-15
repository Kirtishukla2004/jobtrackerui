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

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setSignupError("");
    setSigninError("");
  }, [isActive]);

  /* ---------------- SIGN UP ---------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (!password.trim()) {
      setSignupError("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({
        name,
        username: email,
        password: password.trim(),
      });

      if (data.data?.message === "User created successfully") {
        setIsActive(true);
      } else {
        setSignupError(data.data?.message || "Signup failed");
      }
    } catch {
      setSignupError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SIGN IN ---------------- */
  const handleSignin = async (e) => {
    e.preventDefault();
    setSigninError("");

    if (!password.trim()) {
      setSigninError("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const result = await signinUser({
        username: email,
        password: password.trim(),
      });

      if (!result.success) {
        setSigninError(result.message);
        return;
      }

      saveAuth(result.data);
      navigate("/", { replace: true });
    } catch (err) {
      setSigninError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full overflow-y-auto bg-transparent">
      {/* WRAPPER */}
      <div
        className={`relative transition-all duration-700 ease-in-out
        flex justify-center
        px-4 py-6 sm:py-0
        sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        ${isActive ? "sm:translate-x-[10%]" : "sm:translate-x-[-10%]"}`}
      >
        {/* ---------------- SIGN UP FORM ---------------- */}
        <form
          onSubmit={handleSignup}
          className={`transition-opacity duration-300
          ${isActive ? "opacity-0 pointer-events-none hidden" : "opacity-100 block"}`}
        >
          <div className="w-full max-w-md p-5 sm:p-9 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/40 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-[#0b2545] mb-1">
              Create Account
            </h2>
            <p className="mb-5 text-[#334e7d] font-medium">
              Start managing everything
            </p>

            {/* Name */}
            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faUser} />
              <input
                placeholder="Name"
                className="bg-transparent outline-none py-2 sm:py-3 text-sm sm:text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                placeholder="Email"
                className="bg-transparent outline-none py-2 sm:py-3 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none py-2 sm:py-3 text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {signupError && (
              <p className="text-red-500 text-sm mt-2">{signupError}</p>
            )}

            <button
              disabled={loading}
              className="w-full mt-5 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]
              disabled:opacity-60"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* ---------------- SIGN IN FORM ---------------- */}
        <form
          onSubmit={handleSignin}
          className={`transition-opacity duration-300
          ${isActive ? "opacity-100 block" : "opacity-0 pointer-events-none hidden"}`}
        >
          <div className="w-full max-w-md p-5 sm:p-9 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/40 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-[#0b2545] mb-1">
              Welcome Back
            </h2>
            <p className="mb-5 text-[#334e7d] font-medium">
              Sign in to continue
            </p>

            {/* Email */}
            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                placeholder="Email"
                className="bg-transparent outline-none py-2 sm:py-3 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none py-2 sm:py-3 text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {signinError && (
              <p className="text-red-500 text-sm mt-2">{signinError}</p>
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
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]
              disabled:opacity-60"
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
