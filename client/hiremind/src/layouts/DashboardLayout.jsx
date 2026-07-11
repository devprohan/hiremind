import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
 
  return (
    <div className="flex min-h-screen bg-[#fafaff]">
      <Sidebar />

      <div className="min-w-0 flex-1">
       

        <main className="p-6 lg:p-8">
       

          <Outlet />
        </main>
      </div>
    </div>
  );
}