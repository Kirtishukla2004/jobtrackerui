import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearAuth, getUser,getUserEmail } from "../../services/authStorage";

import {
  LayoutDashboard,
 // FileText,
  Lightbulb,
  MessageSquare,
  Power,
  Menu,
  X,
} from "lucide-react";

function SidebarLayout() {
  const navigate = useNavigate();
  const user = getUser();
  //console.log(user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const email =getUserEmail();
  const menuItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
   // { label: "Resume", path: "/resume", icon: FileText },
    { label: "Interview Insights", path: "/interviews", icon: Lightbulb },
    { label: "Queries & Feedback", path: "/queries", icon: MessageSquare },
  ];

  const handleLogout = () => {clearAuth(); navigate("/subscribe", { replace: true });};

  const getInitials = (name = "") =>
     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex min-h-screen bg-[#eef2f8]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[300px] bg-gradient-to-b from-[#3a5fa0] via-[#2f4f8f] to-[#253e73] text-white flex flex-col transform    transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="relative flex items-center gap-4 p-6 border-b border-white/10">
          <button onClick={() => setSidebarOpen(false)} className="absolute right-4 top-4 lg:hidden">
            <X size={20} />
          </button>

     <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white  flex items-center justify-center shrink-0 text-lg font-semibold p-5"> 
     {getInitials(user?.name, "Guest")} </div>
     <div className="leading-tight">
       <p className="font-semibold">{user?.name || "Guest"}</p> <p className="text-sm text-blue-100"> @{email || "Email"}</p>
      </div>
      </div> <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
                  ${isActive  ? "bg-white/10 font-semibold": "hover:bg-white/10"}`}>
                  <item.icon size={20} className="text-white/80" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

   
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 bg-[#2b51a0] hover:bg-[#3b5998]/90 rounded-md px-4 py-2 text-sm">
            <Power size={18} />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 w-full">
        <div className="lg:hidden flex items-center gap-4 p-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-semibold text-[#303b51]">Dashboard</span>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
