
import dummyImg from '../../assets/dummyImg.jpg';

const ClientsCard = ({ client, date, time, paragraphText }) => {


  // Define background color based on index
  const backgroundColor = key % 2 === 0 ? 'bg-gray-100' : 'bg-white';

  return (
    <div className={`px-4 py-[13px] ${backgroundColor}`}>
      <div className="flex gap-3 items-center">
        <img src={dummyImg} alt="client-image" className="rounded-full w-[28px]" />
        <div>
          <div className="flex items-center">
            <h1 className="font-[14px] text-[#006786]">{client.name}</h1>
            <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
            <p className="font-[12px] text-[#5f5f5f]">{date}</p>
            <span className="font-[12px] text-[#5f5f5f] mx-2">-</span>
            <p className="font-[12px] text-[#5f5f5f]">{time}</p>
          </div>
          <div className="font-[14px] text-[#2b2b2b]">
            <p>{paragraphText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsCard;