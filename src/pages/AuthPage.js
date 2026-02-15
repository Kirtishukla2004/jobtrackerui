import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormsContainer from "../components/FormsContainer";
import SwitchFormsContainer from "../components/SwitchFormsContainer";
import { isLoggedIn } from "../services/authStorage";

function AuthPage() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className={`hidden lg:block absolute h-[2000px] w-[2000px] top-[-150%] rounded-full bg-[#39a1ff] transition-all duration-[1200ms] ease-in-out pointer-events-none [0]
       ${isActive ? "right-[-80%]" : "right-[54%]"}`}/>

      <FormsContainer isActive={isActive} setIsActive={setIsActive} />
      <SwitchFormsContainer
        isActive={isActive}
        handleClick={() => setIsActive((p) => !p)}
      />
    </section>
  );
}

export default AuthPage;
