import React from "react";
import { board, add } from '../../assets'
function Filter() {
    return (
        <div className="flex justify-between">

            <div className="flex">
                <div className="flex gap-2 items-center font-medium pl-4 py-2">
                    <img src={board} alt="" />
                    <p>Board View</p>
                </div>


                <div className="flex items-center gap-2 text-[#1C1D2280] font-medium px-6 py-2">
                    <img src={add} alt="" />
                    <p>Add View</p>
                </div>
            </div>
            <div className="flex items-center gap-4 pr-6">
                <p className="font-semibold">Filter</p>
                <p className="font-semibold opacity-60">Sort</p>
                <button className="bg-black px-4 py-1 text-white rounded-full flex items-center justify-center">New Template</button>
            </div>

        </div>
    );
};

export default Filter;
