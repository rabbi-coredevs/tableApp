
import AlertCard from "./AlertCard";

const Alerts = () => {
  const alerts = [
    {
      alertfor: "Alert For Client Insurance Renewal",
      date: "2024-04-05",
      time: "10:00 AM",
      nameInsured: "Holachip",
      policyNo: "POL123456",
      expiryDate: "2024-05-01",
      remainingDays: 26,
    },
    {
      alertfor: "Alert For Client Insurance Policy expiration",
      date: "2024-04-05",
      time: "10:00 AM",
      nameInsured: "Holachip",
      policyNo: "POL123456",
      expiryDate: "2024-05-01",
      remainingDays: 26,
    },
  ];

  return (
    <div>
      {alerts.map((alert, index) => (
        <AlertCard
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
  );
};

export default Alerts;
