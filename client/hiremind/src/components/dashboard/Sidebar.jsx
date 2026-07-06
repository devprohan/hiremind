import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Upload } from "lucide-react";
import { FileUser } from "lucide-react";
import {MessageSquareText} from "lucide-react";
import {User} from "lucide-react";
import {Settings} from "lucide-react";
import {SearchCheck} from "lucide-react";


const Sidebar = () => {
    const navigate = useNavigate();
     const location = useLocation();
     console.log(location);
     
    const items = [
        {name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        },
        {name: "Upload Resume",
        path: "/uploadresume",
        icon: Upload,
        },
        {name: "My Resume",
        path: "/myresume",
        icon: FileUser,
        },
        {name: "Job Match",
        path: "/jobmatch",
        icon: SearchCheck,
        },
        {name: "Interview Prep",
        path: "/interviewprep",
        icon: MessageSquareText,
        },
        {name: "Profile",
        path: "/profile",
        icon: User,
        },
        {name: "Settings",
        path: "/settings",
        icon: Settings,
        }




        
    ]
  return (

    
        <aside className='flex flex-col  h-screen '>
            <div >
            lOGo
            </div>

            <div className='flex-1'>
                
                {items.map((item) =>{
                    const Icon = item.icon;
                   return (
                   <p className="flex items-center gap-3" key={item.path} onClick={() => 
                     navigate(item.path)
                   }
                   
                   ><Icon/>{item.name}</p>
                )
                })}
            </div>

            <div >
                logout
            </div>
        </aside>
        
    
  )
}

export default Sidebar
