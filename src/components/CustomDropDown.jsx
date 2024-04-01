import { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options = [], Icon, selectedOption = '', setSelectedOption = () => undefined, handleOptionClick = () => undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="" ref={dropdownRef}>
      <button
        className="w-[90px] h-[30px] px-2 py-1 text-[#f5f5f5] bg-[#121a27] rounded outline outline-2 outline-offset-0 outline-blue-500 flex justify-between items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || 'Month'} <Icon className='h-[20px] w-[20px] text-[#121a27]' />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 p-1 w-[90px] bg-[#121a27] rounded-md shadow-lg outline outline-2 outline-offset-0 outline-blue-500">
          <ul>
            {options.map(({ value, key }, index) => (
              <li
                key={index}
                className={`px-4 py-2 mt-[2px] cursor-pointer rounded-lg text-[#f5f5f5] ${
                  selectedOption === value ? 'text-[#f5f5f5]' : 'hover:text-[#0094ff]'
                  }`}
                onClick={() => {
                  handleOptionClick(value, key);
                  setIsOpen(false);
                }}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
