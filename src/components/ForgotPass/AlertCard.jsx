import AlertIcon from "../../assets/alertIcon.svg?react";

const AlertCard = ({alertfor, date, time, nameInsured, policyNo, expiryDate, remainingDays}) => {
// console.log(alerts);
    
  return (
    <div className={`p-4 bg-white border`}>
      <div className="flex gap-3 items-center">
        <AlertIcon
          className="w-[28px]"
        />
        <div>
          <div className="flex items-center">
            <h1 className="font-[14px] text-[#1F7A95]">{alertfor}</h1>
            <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
            <p className="font-[12px] text-[#5f5f5f]">{date|| 'N/A'}</p>
            <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
            <p className="font-[12px] text-[#5f5f5f]">{time|| 'N/A'}</p>
          </div>
          <div className="flex justify-around  gap-6 font-[14px] text-[#2b2b2b]">
            <p className="font-[14px] text-[#5f5f5f] ">Name Insured: <span className="underline text-black px-2">{nameInsured}</span></p>
            <div className=" border-r-[1px]"></div>
            <p className="font-[14px] text-[#5f5f5f] ">Policy No: <span className="underline text-black px-2">{policyNo}</span></p>
            <div className=" border-r-[1px]"></div>
            <p className="font-[14px] text-[#5f5f5f] ">Expiry Date: <span className=" text-[#FF3E46] px-2">{expiryDate} Days</span></p>
            <div className=" border-r-[1px]"></div>
            <p className="font-[14px] text-[#5f5f5f] ">Remaining day: <span className=" text-[#FF754C] px-2">{remainingDays} Days</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
