import SearchIcon from "../../assets/search.svg?react";
import CalendarIcon from '../../assets/calendarIcon.svg?react';
import DatePick from "../message/DatePick";

const SearchComp = () => {
    const getDate = (val)=>{
        console.log(val)
    }
  return (
    <div className="bg-white flex justify-between pb-3 items-center">
      <div className="flex gap-x-3 items-center w-[25rem] px-3 py-[0.625rem] bg-[#F9F9F9] rounded-lg">
        <div className="w-5 h-5 flex justify-center items-center">
        <SearchIcon className="w-[0.938rem] h-[0.938rem]" />
        </div>
        <input type="text" name="" placeholder="Search..." className="outline-none bg-[#F9F9F9] h-5" />
      </div>
      <div className=" w-[12.5rem] rounded-lg">
        <DatePick
        onChange={getDate}
        DatePickerIcon= {CalendarIcon}
        />
      </div>
    </div>
  );
};

export default SearchComp;
