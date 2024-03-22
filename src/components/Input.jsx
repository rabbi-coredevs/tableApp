import Show from '../assets/Show.svg?react';
import Hide from '../assets/Hide.svg?react';
import { useState } from 'react';

const Input = ({label='', type='text',placeholder='',register =()=> {},errors,showPassword =false,showMessage = false,...rest}) => {
  const [showIcon, setShowIcon]=useState(false);

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="mt-2 text-white  text-left">{label}</label>

      <div className={`flex justify-between items-center px-4 h-10 rounded focus:border focus:border-blue-400 bg-[#121a27] border-[1px] border-[#717c8b]`}>
        <input
          placeholder={placeholder} 
          className="focus:outline-none bg-transparent w-full text-white "
          {...register()}
          type={showPassword ? (showIcon ? 'text' : 'password') : type}
          {...rest}
        />
        {showPassword && (
          <span className="cursor-pointer">
            {showIcon ? <Hide onClick={() => setShowIcon(false)} /> : <Show onClick={() => setShowIcon(true)} />}
          </span>
        )}
      </div>
      {errors && <p className="text-right text-red-700">{errors}</p>}
    </div>
  );
};

export default Input;
