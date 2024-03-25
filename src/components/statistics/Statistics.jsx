import CustomDropdown from "../CustomDropDown";
import AreaChart from "./AreaChart";
import BotTransaction from "./BotTransaction";
import ColumnChart from "./ColumnChart";
import DownIcon from "../../assets/Vector.svg?react";
import { useEffect, useState } from "react";
import Table from "../Table";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import RemoveButton from "../../assets/Remove.svg?react";
import rawData from "./UserStat.json";
import CardComp from "./CardComp";
import Icon1 from "../../assets/SVGRepo_iconCarrier (1).svg?react";
import Icon2 from "../../assets/Icon.svg?react";
import Icon3 from "../../assets/Frame (2).svg?react";
import Icon4 from "../../assets/Frame (1).svg?react";
import UpDownIcon from "../../assets/AscDscIcon.svg?react";

//Limit Component
const LimitComponent = ({ onChangeLimit = () => undefined }) => {
  return (
    <div>
      <label className="text-white">Showing 1 results </label>
      <select onChange={(e) => onChangeLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

const Statistics = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  const DropDownOptions = [
    {
      key: "day",
      value: "Day",
    },
    {
      key: "week",
      value: "Week",
    },
    {
      key: "month",
      value: "Month",
    },
    {
      key: "all",
      value: "All",
    },
  ];

  const handleOptionClick = (value, key) => {
    setSelectedOption(value);
    setIsOpen(false);

    // Check the selected option and perform actions accordingly
    switch (key) {
      case "day":
        console.log("Day option clicked");

        break;
      case "week":
        console.log("Week option clicked");
        break;
      case "month":
        break;
      case "all":
        console.log("All option clicked");
        break;
      default:
        // Handle default case if needed
        break;
    }
  };

  const cardData = [
    {
      title: "Total Bot User:",
      value: 123456,
      Icon: Icon1,
    },
    {
      title: "Active User today:",
      value: 654321,
      Icon: Icon2,
    },
    {
      title: "New Users today:",
      value: 123,
      Icon: Icon3,
    },
    {
      title: "Total Trade Amount:",
      value: 123123,
      Icon: Icon4,
    },
  ];

  const cardStyles = {
    card: {
      style: {
        width: "",
        margin: "",
        border: "1px solid red",
        padding: "20px",
      },
      className: ``,
    },
  };

  const config = [
    {
      head: "User Name",
      key: "userName",
      onClick: (val) => console.log(val),
    },
    {
      head: "Joining Date",
      key: "join_date",
      Icon: UpDownIcon,
    },
    {
      head: "Trade Amount",
      key: "trade_amount",
      Icon: UpDownIcon,
    },
  ];

  useEffect(() => {
    setData(rawData.slice((page - 1) * limit, (page - 1) * limit + limit));
  }, [page, limit]);

  const styles = {
    wrapper: {
      style: {
        width: "100%",
        margin: "auto",
        backgroundColor: "#142030",
        border: "1px solid red",
      },
      className: ``,
    },
    table: {
      tableMain: {
        style: {
          border: "",
          backgroundColor: "#142030",
          padding: "",
          borderRadius: "10px",
        },
        className: `w-full`,
      },
      headerGroup: {
        style: { border: "2px solid red" },
        className: ``,
      },
      headerRow: {
        style: {
          borderBottom: "1px solid #E1E3E5",
          borderTop: "1px solid #E1E3E5",
          textTransform: "uppercase",
          textAlign: "left",
          fontSize: "16px",
          color: "#001E17",
          borderRadius: "20px",
        },
        className: ``,
      },
      header: {
        style: {
          paddingTop: "16px",
          paddingBottom: "16px",
          paddingLeft: "20px",
          paddingRight: "",
          borderRadius: "",
          backgroundColor: "#212c3a",
          color: "white",
          fontSize: "14px",
          fontWeight: "400",
          textAlign: "left",
        },
        className: ``,
      },
      headerAction: {
        style: { border: "2px solid bla ck" },
        className: ``,
      },
      body: {
        style: { border: "", paddingLeft: "20xp" },
        className: ``,
      },
      row: {
        style: {
          paddingLeft: "20px",
          borderTop: "16px",
          borderBottom: "1px solid #212c3a",
          fontSize: "14px",
          fontWeight: "400",
          textAlign: "left",
          color: "white",
          ":hover": {},
        },
        className: ``,
      },
      rowData: {
        style: { border: "2px solid yellow" },
        className: ``,
      },
      rowAction: {
        style: { border: "2px solid gree n" },
        className: ``,
      },
      actionIcon: {
        style: { margin: "auto" },
        className: ``,
      },
      loadingWrapper: {
        style: { border: "2px solid gre en" },
        className: ``,
      },
      loading: {
        style: { border: "2px solid blu e" },
        className: ``,
      },
    },
    pagination: {
      wrapper: {
        style: { border: "", marginTop: "20px", color: "" },
        className: ``,
      },
      text: {
        style: { border: "1px solid gre en" },
        className: ``,
      },
      buttonWrapper: {
        style: { border: "" },
        className: ``,
      },
      buttons: {
        style: { background: "", padding: "12px", color: "white" },
        className: ``,
      },
      pageButton: {
        style: {
          border: "1px solid #004B81 ",
          padding: "4px",
          borderRadius: "8px",
          height: "36px",
          width: "40px",
          color: "white",
        },
        className: ``,
      },
      prev: {
        style: {
          border: "1px solid #004B81",
          borderRadius: "8px",
          height: "36px",
          width: "40px",
        },
        className: ``,
      },
      next: {
        style: {
          border: "1px solid #004B81",
          borderRadius: "8px",
          height: "36px",
          width: "40px",
        },
        className: ``,
      },
      pages: {
        style: {
          border: "1px solid #004B81",
          borderRadius: "8px",
          color: "white",
        },
        className: ``,
      },
      activePage: {
        style: {
          background: "#0094FF",
          color: "white",
          padding: "4px",
          borderRadius: "8px",
          height: "36px",
          width: "40px",
        },
        className: ``,
      },
    },
  };

  return (
    <div className="p-5 overflow-y-auto">
      <div className="">
        <ColumnChart />
        <div className="md:flex gap-3 ">
          <AreaChart />
          <BotTransaction />
        </div>
        <div className="md:flex gap-3 mt-3 ">
          <div className="p-5 bg-[#142030] rounded-xl md:w-1/2">
            <div className="flex justify-between border-b-[0.5px]">
              <h1 className="text-white">User Statistics</h1>
              <div style={{ position: "relative", zIndex: 1 }}>
                <CustomDropdown
                  options={DropDownOptions}
                  Icon={DownIcon}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  handleOptionClick={handleOptionClick}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
              {cardData.map((item, index) => (
                <CardComp
                  title={item.title}
                  value={item.value}
                  Icon={item.Icon}
                  styles={styles}
                  key={index}
                />
              ))}
            </div>
            <div className="user-stat overflow-x-auto">
              <Table
                // actions={actions}
                config={config}
                data={data}
                styles={styles}
                pagination={{
                  showPage: true,
                  totalDocs: rawData.length,
                  totalPage: Math.ceil(rawData.length / limit),
                  page,
                  limit,
                  onChange: (num) => setPage(num),
                  onChangeLimit: (num) => setLimit(num),
                  buttons: {
                    Prev: CaretLeft,
                    Next: CaretRight,
                    Remove: RemoveButton,
                  },
                  LimitComp: LimitComponent,
                  chooseLimit: true,
                }}
              />
            </div>
          </div>

          <div className="p-5 bg-[#142030] rounded-xl md:w-1/2">
            <div className="user-stat ">
              <h1 className="text-[18px] text-white border-b-[0.5px] mb-3">
                Referal Statistics
              </h1>
              <Table
                // actions={actions}
                config={config}
                data={data}
                styles={styles}
                pagination={{
                  showPage: true,
                  totalDocs: rawData.length,
                  totalPage: Math.ceil(rawData.length / limit),
                  page,
                  limit,
                  onChange: (num) => setPage(num),
                  onChangeLimit: (num) => setLimit(num),
                  buttons: {
                    Prev: CaretLeft,
                    Next: CaretRight,
                    Remove: RemoveButton,
                  },
                  LimitComp: LimitComponent,
                  chooseLimit: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
