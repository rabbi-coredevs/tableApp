import AlertIcon from "../../assets/alertIcon.svg?react";

const AlertModalCard = ({alertfor, date, time, nameInsured, policyNo, expiryDate, remainingDays}) => {
  return (
    <>  
    <div className="flex gap-2 items-center px-3 py-4 bg-[#EFF8F7] ">
      <AlertIcon
        className="w-[28px]"
      />
      <div className="">
        <div className="flex">
          <h1 className="font-[14px] text-[#1F7A95]">{alertfor}</h1>
          <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
          <p className="font-[12px] text-[#5f5f5f]">{date|| 'N/A'}</p>
          <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
          <p className="font-[12px] text-[#5f5f5f]">{time|| 'N/A'}</p>
        </div>
        <div className="flex justify-around  gap-6 font-[14px] text-[#2b2b2b]">
          <p className="font-[14px] text-[#5f5f5f] ">Name Insured: <span className="underline text-black px-2">{nameInsured}</span></p>
          <p className="font-[14px] text-[#5f5f5f] ">Policy No: <span className="underline text-black px-2">{policyNo}</span></p>
        </div>
      </div>
    </div>
  </>
  )
};

export default AlertModalCard;
