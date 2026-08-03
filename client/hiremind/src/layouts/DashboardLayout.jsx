import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
 
  return (
    <div className="flex min-h-screen bg-[#fafaff] text-slate-900
    transition-colors
    duration-300

    dark:bg-slate-950
    dark:text-white">
      <Sidebar />

      <div className="min-w-0 flex-1">
       

        <main className="p-6 lg:p-8">
       

          <Outlet />
        </main>
      </div>
    </div>
  );
}