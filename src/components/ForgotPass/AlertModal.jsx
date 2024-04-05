import DatePick from "../message/DatePick";
import SearchIcon from "../../assets/search.svg?react";
import NotificationIcon from "../../assets/Notification.svg?react";
import { useState } from "react";
import AlertCard from "./AlertCard";
import AlertModalCard from "./AlertModalCard";

const AlertModal = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const alerts = [
    {
      alertfor: "Alert For..",
      date: "2024/04/05",
      time: "10:00 am",
      nameInsured: "Holachip",
      policyNo: "POL123456",
      expiryDate: "2024-05-01",
      remainingDays: 26,
    },
    {
      alertfor: "Alert For Client Insurance Policy expiration",
      date: "2024/04/05",
      time: "10:00 am",
      nameInsured: "Holachip",
      policyNo: "POL123456",
      expiryDate: "2024-05-01",
      remainingDays: 26,
    },
    {
        alertfor: "Alert For Client Insurance Renewal",
        date: "2024/04/05",
        time: "10:00 am",
        nameInsured: "Holachip",
        policyNo: "POL123456",
        expiryDate: "2024-05-01",
        remainingDays: 26,
      },
      {
        alertfor: "Alert For Client Insurance Policy expiration",
        date: "2024/04/05",
        time: "10:00 am",
        nameInsured: "Holachip",
        policyNo: "POL123456",
        expiryDate: "2024-05-01",
        remainingDays: 26,
      },
      {
        alertfor: "Alert For Client Insurance Renewal",
        date: "2024/04/05",
        time: "10:00 am",
        nameInsured: "Holachip",
        policyNo: "POL123456",
        expiryDate: "2024-05-01",
        remainingDays: 26,
      },
      {
        alertfor: "Alert For Client Insurance Policy expiration",
        date: "2024/04/05",
        time: "10:00 am",
        nameInsured: "Holachip",
        policyNo: "POL123456",
        expiryDate: "2024-05-01",
        remainingDays: 26,
      },
  ];

  return (
    <>
      <div className="bg-white flex justify-between pb-3 items-center relative">
        <div className="flex gap-x-3 items-center w-[25rem] px-3 py-[0.625rem] bg-[#F9F9F9] rounded-lg">
          <div className="w-5 h-5 flex justify-center items-center">
            <SearchIcon className="w-[0.938rem] h-[0.938rem]" />
          </div>
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="outline-none bg-[#F9F9F9] h-5"
          />
        </div>
        <div className="cursor-pointer relative">
          <NotificationIcon
            onClick={() => setIsNotificationOn(!isNotificationOn)}
          />
          {/* Conditionally render the floating div */}
          {isNotificationOn && (
            <div className="absolute top-full right-0 bg-white w-[28.938rem] h-[32.063rem] p-5 rounded-lg shadow-md">
              <div className="flex justify-between mb-2">
                <h1 className="text-[1.125rem] font-semibold">Alert</h1>
                <h1 className="text-[1.125rem] font-semibold">
                  Mark All as read
                </h1>
              </div>
              <hr />
              <div className="border border-red-500 h-[380px] overflow-y-auto">
                {alerts.map((alert, index) => (
                    <AlertModalCard
                      key={index}
                      alertfor={alert.alertfor}
                      date={alert.date}
                      time={alert.time}
                      nameInsured={alert.nameInsured}
                      policyNo={alert.policyNo}
                      expiryDate={alert.expiryDate}
                      remainingDays={alert.remainingDays}
                    />
  
                  
                ))}
              </div>
              <button className="py-2 rounded-lg border w-full">View All Alert</button>
            </div>
          )}
        </div>
        <div className="w-[12.5rem] rounded-lg">
          <DatePick />
        </div>
      </div>
    </>
  );
};

export default AlertModal;
