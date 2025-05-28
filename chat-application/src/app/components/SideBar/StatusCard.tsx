import React from "react";
import { statusDataProps } from "../SideBar";
import { GoDotFill } from "react-icons/go";

const StatusCard = ({ data }: { data: statusDataProps[] }) => {
  return (
    <div className="">
      <main>
        <div className="flex gap-2 overflow-x-auto overscroll-x-none no-scrollbar">
          {data.map((item,index) => (
            <div className="text-center " key={index}>
              <div className="img relative">
                <GoDotFill className="absolute top-5 left-5 text-green-800" size={18}/>
                {item.image }
              </div>
              <p className="name text-xs ">{item.name.split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </main>
      <hr className="opacity-45 my-3" />
    </div>
  );
};

export default StatusCard;
