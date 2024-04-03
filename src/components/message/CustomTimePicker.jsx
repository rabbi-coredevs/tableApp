import { useEffect, useRef, useState } from "react";
import Icon from "../../assets/ClockIcon.svg?react";


const CustomTimePicker = ({ onChange = () => undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const getCurrentTimeAMPM = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM based on hours
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours; // Convert midnight to 12 AM and adjust for PM hours

    const formattedTime = `${displayHours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedTime;
  };

//   const currentTime = getCurrentTimeAMPM();

  const generateTimeArray = () => {
    const timeArray = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Set start time to 12:00 AM (midnight)

    for (let i = 0; i < 288; i++) {
      // 24 hours * 60 minutes / 5 minutes interval = 288 intervals
      const time = new Date(startTime.getTime() + i * 5 * 60 * 1000);
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM based on hours
      const displayHours =
        hours === "00" ? "12" : String(hours % 12).padStart(2, "0"); // Convert midnight to 12 AM

      timeArray.push(`${displayHours}:${minutes} ${ampm}`);
    }
    return timeArray;
  };

  const timeIntervals = generateTimeArray();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (time) => {
    console.log(time);
    setSelectedOption(time);
    onChange(time);
  };

  return (
    <div className="">
      <div className="" ref={dropdownRef}>
        <button
          className="w-full h-[50px] px-2 py-1 text-[#f5f5f5] bg-[#121a27] rounded  flex justify-between items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption : getCurrentTimeAMPM()}
          <Icon className="h-[20px] w-[20px] text-[#121a27]" />
        </button>

        {isOpen && (
          <div className="absolute mt-2 p-1 w-[130px] h-[300px] bg-[#121a27] rounded-md shadow-lg overflow-y-auto  ">
            <ul>
              {timeIntervals.map((time, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 mt-[2px] cursor-pointer rounded-lg text-[#f5f5f5] ${
                    selectedOption === time
                      ? "text-[#f5f5f5] bg-[#0094ff]"
                      : "hover:text-[#0094ff]"
                  }`}
                  onClick={() => {
                    handleOptionClick(time);
                    setIsOpen(false);
                  }}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTimePicker;
