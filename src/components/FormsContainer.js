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
    setEmail("");
    setName("");
    setPassword("");
    setSignupError("");
    setSigninError("");
  }, [isActive]);

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
    <section className="min-h-screen flex items-center justify-center px-4">
     <div
  className={`
    relative w-full max-w-md
    lg:absolute lg:top-1/2 lg:-translate-y-1/2
    lg:transition-all lg:duration-700
    ${isActive ? "lg:left-[25%]" : "lg:left-[55%] lg:mt-[10%]"}
  `}
>
        <form
          onSubmit={handleSignup}
          className={`${isActive ? "hidden lg:block lg:opacity-0" : "block"} `}
        >
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/40 shadow-lg ">
            <h2 className="text-2xl text-[#0b2545] mb-1">
              Create Account
            </h2>
            <p className="mb-5 text-[#334e7d] font-medium">
              Start managing everything
            </p>

            <Input icon={faUser} value={name} onChange={setName} placeholder="Name" />
            <Input icon={faEnvelope} value={email} onChange={setEmail} placeholder="Email" />
            <Input icon={faLock} value={password} onChange={setPassword} placeholder="Password" type="password" />

            {signupError && <p className="text-red-500 text-sm">{signupError}</p>}

            <button
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]
              disabled:opacity-60"
            >
              Sign Up
            </button>

            <p className="mt-4 text-center text-sm lg:hidden">
              Already a member?{" "}
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className="text-[#5f7cff] font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>

   
        <form
          onSubmit={handleSignin}
          className={`${isActive ? "block lg:mb-[70%] lg:mr-[10%]" : "hidden lg:block lg:opacity-0"}`}
        >
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/40 shadow-lg">
            <h2 className="text-2xl text-[#0b2545] mb-1">
              Welcome Back
            </h2>
            <p className="mb-5 text-[#334e7d] font-medium">
              Sign in to continue
            </p>

            <Input icon={faEnvelope} value={email} onChange={setEmail} placeholder="Email" />
            <Input icon={faLock} value={password} onChange={setPassword} placeholder="Password" type="password" />

            {signinError && <p className="text-red-500 text-sm">{signinError}</p>}

            <div className="text-right mt-2">
              <Link to="/forgotpassword" className="text-sm text-[#5f7cff]">
                Forgot password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-br from-[#39a1ff] to-[#5f7cff]"
            >
              Sign In
            </button>

            <p className="mt-4 text-center text-sm lg:hidden">
              New here?{" "}
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="text-[#5f7cff] font-medium"
              >
                Create account
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Input({ icon, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="grid grid-cols-[40px_1fr] items-center px-3 my-2 rounded-xl bg-white/60 border border-white/60">
      <FontAwesomeIcon icon={icon} />
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none py-3 text-[#0b2545]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default FormsContainer;
