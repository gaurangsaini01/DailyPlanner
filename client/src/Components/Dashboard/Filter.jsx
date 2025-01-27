import React from "react";
import { board } from '../../assets'
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
function Filter() {
    return (
        <div className="hidden lg:flex dark:text-[#f9f9f9] justify-between lg:visible ">

            <div className="flex">
                <div className="flex gap-2 items-center font-medium pl-4 py-2">
                    {/* <img src={board} alt="" /> */}
                    <MdOutlineSpaceDashboard className="" />
                    <p>Board View</p>
                </div>


                <div className="flex items-center gap-2 text-[#1C1D2280] dark:text-[#f9f9f980] font-medium px-6 py-2">
                    <IoIosAddCircleOutline />
                    <p>Add View</p>
                </div>
            </div>
            <div className="flex items-center gap-4 pr-6">
                <p className="font-semibold">Filter</p>
                <p className="font-semibold opacity-60">Sort</p>
                <button className="bg-black dark:bg-[#4b6af9] dark:text-[#f9f9f9] px-4 py-1 text-white rounded-full flex items-center justify-center">New Template</button>
            </div>

        </div>
    );
};

export default Filter;
