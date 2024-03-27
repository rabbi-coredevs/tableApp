import { useState } from "react";
import Chart from "react-apexcharts";
import DownIcon from "../../assets/Vector.svg?react";
import CustomDropdown from "../CustomDropDown";

const AreaChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleChangeMonth = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const getDataForMonth = (monthIndex) => {
    // Assuming you have your data structured as an array of sales data for each month,year and week
    const salesData = [
      [1400, 1300, 2400, 1500, 2600, 1700, 2800, 1900, 2000, 1100, 2200, 1300],
      [2426, 3171, 4425, 2882, 4580, 4545, 3208, 1257, 3022, 2795],
      [500, 800, 500, 600, 700, 400, 900, 1000, 1100, 1200, 1300, 1400],
      // Data for other months...
    ];
    return salesData[monthIndex];
  };

  const category = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    // days:Array.from({ length: 31 }, (_, i) => i + 1) //for days in a month
    years: [
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
    ],
  };

  const options = {
    // width: '100%',
    // height: '100%',
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: selectedMonth ? category.years : category.months,
      labels: {
        style: {
          colors: 'white'
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#0285e5", "#247BA0"],
    fill: {
      type: "solid",
      opacity: 0.2,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Total Comission Statistics",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#bdc0c4",
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          if (!selectedMonth) return value + "K";
          return value;
        },
        style: {
          colors: "white",
        },
      },
    },
    tooltip: {
      x: {
        format: "MMM",
      },
      y: {
        formatter: function (value) {
          return value + " Taka";
        },
      },
    },
  };

  const series = [
    {
      name: "Expenses",
      data: getDataForMonth(selectedMonth),
    },
    
  ];

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
      key: "year",
      value: "Year",
    },
  ];

  return (
    <div
    className="relative bg-[#141f2f] rounded-xl border-[1px] border-[#1f2a39] w-full md:w-1/2 " style={{ height: "50vh" }}
    >
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
        <select 
          value={selectedMonth} 
          onChange={handleChangeMonth} 
          style={{ position: "relative", zIndex: 1 }}
        >
          <option value={0} selected>
            Month
          </option>
          <option value={1}>Week</option>
          <option value={2}>Year</option>
        </select>
        {/* <CustomDropdown options={DropDownOptions} Icon={DownIcon} /> */}
      </div>
      <Chart
        options={options}
        series={series}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default AreaChart;
