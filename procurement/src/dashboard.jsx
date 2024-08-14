import React from "react";
import Sidebar from "./Components/Navigation_Panel/sidebar";
import Navbar from "./Components/Navbar/navbar";
import NumberCard from "./Components/number_card";
import VendorTable from "./Components/vendor_table";
import CountrySelect from "./Components/country_select";
import DatePicker from "./Components/date_picker";
import { useSidebar } from './contexts/SidebarContext';

const Dashboard = () => {
    const { open } = useSidebar();

    return (
        <section className="w-full flex">
            <Sidebar />
            <div className={`container-1 h-screen ${open ? "w-[calc(100%-300px)]" : "w-[calc(100%-64px)]"} duration-500`}>
                <Navbar />
                <main className="flex justify-between py-10 h-auto">
                    <section className="w-3/4 flex flex-col gap-10">
                        <NumberCard />
                        <VendorTable />
                    </section>
                    <section className="w-1/4 pl-10 flex flex-col gap-10">
                        <CountrySelect />
                        <DatePicker />
                    </section>
                </main>
            </div>
        </section>
    );
};

export default Dashboard