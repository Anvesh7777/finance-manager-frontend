import {
  Outlet,
} from "react-router-dom";

function MainLayout() {

  return (

    <div className="min-h-screen bg-[#f7f4ff] relative overflow-x-hidden">

      {/* BACKGROUND BLUR */}

      <div className="pointer-events-none absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-300/30 rounded-full blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-cyan-200/30 rounded-full blur-3xl" />

      {/* PAGE CONTENT */}

      <div className="relative z-10">

        <Outlet />

      </div>

    </div>
  );
}

export default MainLayout;