import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React, { useState, useEffect, useRef } from "react";


const DatePick = ({
  onChange = () => undefined,
  DatePickerIcon = CaretRight,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentDate, setCurrentdate] = useState(new Date());
  const [daysInMonth, setDaysinmonth] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  );
  const [startDay, setStartday] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        if (!selectedDay && isOpen) {
          //   setSelectedDay(currentDate);
        }
        setIsOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentDate, selectedDay, isOpen]);


  //Calls everytime currentDate updated
  useEffect(() => {
    setDaysinmonth(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate()
    );
    setStartday(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    );
  }, [currentDate]);


  //fucntion to mark today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };


  const handleDayClick = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDay(newDate);
    setIsOpen(false);


    //function received as props
    onChange(newDate.toLocaleDateString());
  };


  //render year dynamically from 1900 t0 2030
  const renderYearOptions = () => {
    const yearOptions = [
      <option key={0} value={""} disabled>
        Year
      </option>,
    ];


    for (let i = 2030; i >= 1900; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }


    return yearOptions;
  };


  //Function called when month is changed
  const handleMonthChange = (manipMonth) => {
    const newdate = currentDate;
    newdate.setMonth(currentDate.getMonth() + manipMonth);
    setCurrentdate(new Date(newdate));
  };


  return (
    <div className="select-none w-full " ref={datepickerRef}>
      <div className="flex justify-between items-center px-4 h-10 rounded focus:border focus:border-blue-400 bg-[#F9F9F9]">
        <div className="text-[#5F5F5F80] text-sm ">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString()
            : "Expiry Date"}
        </div>
        <div className="">
          <DatePickerIcon
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>
      <div className="relative w-[400px]">
        <div className="flex justify-center absolute top-0 left-0 right-0 bg-white z-10">
          {isOpen && (
            <div className="container p-4 border-2 border-[#5F5F5F80] rounded-lg">
              <div className="flex flex-row justify-center gap-1">
                <CaretLeft
                  className="bg-gray-200 p-1 rounded-full hover:text-white hover:bg-blue-400"
                  size={30}
                  onClick={() => handleMonthChange(-1)}
                />
                <div>
                  <select
                    className="border-none outline-none bg-transparent appearance-none  text-end"
                    value={currentDate.getMonth()}
                    onChange={(e) => {
                      const newdate = currentDate;
                      newdate.setMonth(e.target.value);
                      setCurrentdate(new Date(newdate));
                    }}
                  >
                    {months.map((month, index) => (
                      <option className="text-start " value={index} key={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <select
                    className="outline-none appearance-none bg-transparent"
                    value={currentDate.getFullYear()}
                    onChange={(e) => {
                      const newdate = currentDate;
                      newdate.setFullYear(e.target.value);
                      setCurrentdate(new Date(newdate));
                    }}
                  >
                    {renderYearOptions()}
                  </select>
                </div>
                <CaretRight
                  className="bg-gray-200 p-1 rounded-full hover:text-white hover:bg-blue-400"
                  size={30}
                  onClick={() => handleMonthChange(+1)}
                />
              </div>


              <div className="grid grid-cols-7 gap-1 p-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (weekday) => (
                    <span key={weekday} className="text-center">
                      {weekday}
                    </span>
                  )
                )}
                {new Array(startDay).fill("").map((_, index) => (
                  <span key={index}>{_}</span>
                ))}
                {new Array(daysInMonth).fill("").map((_, index) => (
                  <span
                    key={index}
                    className={`text-center p-2 rounded cursor-pointer bg-gray-200 hover:bg-[#0094ff] hover:text-white ${isToday(index + 1) && " text-white"
                      }
             ${selectedDay?.getFullYear() === currentDate?.getFullYear() &&
                        selectedDay?.getMonth() === currentDate?.getMonth() &&
                        selectedDay?.getDate() === index + 1
                        ? "bg-orange-500 text-white"
                        : ""
                      }`}
                    onClick={() => handleDayClick(index + 1)}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default DatePick;