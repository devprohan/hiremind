import { NavLink } from "react-router-dom";
const items = [
  ["Dashboard", "/dashboard"],
  ["Upload Resume", "/dashboard/upload-resume"],
  ["My Resumes", "/dashboard/my-resume"],
  ["AI Job Match", "/dashboard/job-match"],
  ["Interview Prep", "/dashboard/interview-prep"],
  ["Profile", "/dashboard/profile"],
  ["Settings", "/dashboard/settings"],
];
export default function Sidebar() {
 
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r bg-white p-5">
      <div className="mb-10 text-2xl font-black">
        Hire<span className="text-violet-600">Mind</span>
      </div>
     
         <nav className="flex-1 space-y-2">
        {items.map(([n, p]) => (
          <NavLink
            key={p}
            to={p}
            end={p === "/dashboard"}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm ${isActive ? "bg-violet-100 text-violet-700" : "text-slate-600 hover:bg-slate-50"}`
            }
          >
            {n}
          </NavLink>
        ))}
      </nav>
      
     
      <button className="mt-auto w-full rounded-xl border border-red-400 px-4 py-3 text-left text-red-500">
        Logout
      </button>
    </aside>
  );
}
