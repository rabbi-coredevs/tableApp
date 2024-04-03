import { useState } from 'react';

const CustomTimePick = ({ onChange = () => {}, ClockIcon }) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [ampm, setAmPm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
            setHours(value);
        }
    };

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
            setMinutes(value);
        }
    };

    const handleAmPmChange = (e) => {
        const value = e.target.value;
        setAmPm(value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const setTime = () => {
        if (hours !== '' && minutes !== '' && ampm !== '') {
            const fullTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`;
            onChange(fullTime);
            toggleDropdown();
        }
    };

    return (
        <div className={`pt-2`}>
            <div className="flex justify-between items-center px-4 h-10 rounded  bg-[#121a27]">
                <div
                    className="text-white"
                >
                    {hours === "" || minutes === "" || ampm === ""
                        ? "Select Time"
                        : `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${ampm}`}
                </div>
                <div className="cursor-pointer">
                    <ClockIcon
                        onClick={toggleDropdown}
                    />
                </div>

            </div>
            {isOpen && (
                <div className="absolute z-10 bg-white border-2 border-blue-800 rounded mt-2 shadow-md ">
                    <div className="flex justify-center p-2">
                        <select
                            value={hours}
                            onChange={(e) => handleHoursChange(e)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option disabled value="">Hour</option>
                            {[...Array(12).keys()].map((index) => (
                                <option
                                    key={index}
                                    value={(index + 1).toString().padStart(2, "0")}
                                >
                                    {(index + 1).toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <span className="text-gray-500">:</span>
                        <select
                            value={minutes}
                            onChange={(e) => handleMinutesChange(e)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option selected disabled value="">Minute</option>
                            {[...Array(60).keys()].map((index) => (
                                <option key={index} value={index.toString().padStart(2, "0")}>
                                    {index.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <select
                            value={ampm}
                            onChange={handleAmPmChange}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option disabled value="">AM/PM</option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <div className="flex justify-center p-2">
                        <button disabled={hours === '' && minutes === '' && ampm === ''}
                            className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center"
                            onClick={setTime}
                        >
                            {hours === "" || minutes === "" || ampm === ""
                                ? "Select Time"
                                : `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${ampm}`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomTimePick;
