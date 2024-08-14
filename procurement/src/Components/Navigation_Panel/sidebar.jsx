import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from '@/contexts/SidebarContext';
import { useNav } from '../../contexts/NavContext';
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
    const navItems = useNav();
    const { open, toggleSidebar } = useSidebar();

    return (
        <div
            className={`bg-gradient-to-b from-gray-800 via-black to-gray-900 min-h-screen ${open ? "w-[300px]" : "w-16"} duration-500 text-gray-100 px-4`}
        >
            <div className="py-3 flex justify-end">
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer"
                    onClick={toggleSidebar}
                />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
                {navItems?.map((menu, i) => (
                    <Link
                        to={menu?.path}
                        key={i}
                        className="mt-5 group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                    >
                        <div>{React.createElement(menu?.icon, { size: "24" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-32 overflow-hidden"}`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"} absolute left-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10`}
                        >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
