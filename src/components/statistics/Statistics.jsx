import CustomDropdown from "../CustomDropDown";
import AreaChart from "./AreaChart";
import BotTransaction from "./BotTransaction";
import ColumnChart from "./ColumnChart";
import DownIcon from "../../assets/Vector.svg?react";
import { useEffect, useState } from "react";
import Table from "../Table";
import { CaretLeft, CaretRight,} from "@phosphor-icons/react";
import RemoveIcon from '../../assets/RemoveAll.svg?react'
import RemoveButton from '../../assets/Remove.svg?react';
import rawData from '../Admins.json';

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
  const [checkedData,setCheckedData] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10); 
  const [isConfirmModalOpen,setIsConfirmModalOpen] = useState(false);
  const [selectedRow,setSelectedRow] = useState([]);

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



  const config = [
    {
      head: "User Name",
      key: "userName",
      onClick: (val) => console.log(val),
    },
    {
      head: "Joining Date",
      key: "join_date",
    },
    {
      head: "Trade Amount",
      key: "trade_amount",
    }
  ];

  const actions = [
    {
      name: "Action",
      Icon: function Edit({ data, handleClicks, row }) {
        return (
          <>
            {handleClicks.map(({ click, name, Icon }, id) => {
              return (
                <div
                  key={name + id}
                  onClick={() => click(row)}
                  className="p-2 "
                  style={{ cursor: "pointer", margin: "auto" }}
                >
                  <div className="flex items-center gap-1 select-none text-red-500">
                    <Icon />
                    {name}
                  </div>
                </div>
              );
            })}
          </>
        );
      },
      handleClicks: [
        {
          name: "Remove",
          Icon: RemoveButton,
          click: (row) => {
            setIsConfirmModalOpen(true);
            setSelectedRow(row._id);
            // setData(data.filter(item => item._id !== row._id))
          },
        },
      ],
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
          paddingLeft: "",
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
          paddingLeft: "",
          borderTop: "",
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
        <div className="">
          <div className="flex justify-around">
            <h1 className="text-white">User Statistics</h1>
            <CustomDropdown
              options={DropDownOptions}
              Icon={DownIcon}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              handleOptionClick={handleOptionClick}
            />
          </div>
          <div>
            <Table
              actions={actions}
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
  );
};

export default Statistics;
