import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import DownIcon from "../../assets/Vector.svg?react";
import CustomDropdown from "../CustomDropDown";

const BotTransaction = () => {
  const [selectedOption, setSelectedOption] = useState("Day"); // Initialize with "Day"
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: "100%",
      width: "100%",
      toolbar: {
        show: false,
      },
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
      text: "BOT Transactions",
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
          if (selectedOption === "Month") return value + "K";
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
  });

  const [series, setSeries] = useState([
    {
      name: "Series 1",
      data: [],
    },
  ]);

  useEffect(() => {
    handleOptionClick("Day", "day"); // Simulate click on "Day" to populate chart initially
  }, []); // Empty dependency array ensures this runs only once after initial render

  const handleOptionClick = (value, key) => {
    setSelectedOption(value);

    // Define variables for x-axis categories and series data
    let categories = [];
    let data = [];

    // Check the selected option and set categories and data accordingly
    switch (key) {
      case "day":
        categories = Array.from({ length: 31 }, (_, index) => index + 1);
        data = [
          87, 42, 59, 76, 23, 68, 91, 34, 55, 78, 14, 66, 89, 37, 52, 83, 29,
          47, 71, 95, 18, 63, 88, 31, 45, 79, 27, 53, 72, 96,
        ];
        break;

      case "week":
        categories = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
        data = [87, 42, 59, 76, 23, 68, 91];
        break;

      case "month":
        categories = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        data = [12, 23, 45, 65, 76, 87, 32, 45, 65, 76, 80];
        break;

      case "year":
        categories = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        data = [440, 550, 570, 560, 610, 580, 630, 600, 660];
        break;
    }

    // Update options object with new categories and series data
    const updatedOptions = {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: categories,
        labels: {
          style: {
            colors: "white",
          },
        },
      },
    };

    // Set the updated options object
    setOptions(updatedOptions);

    // Set the series data
    setSeries([{ ...series[0], data: data }]);
  };

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
      className="relative bg-[#141f2f] rounded-xl border-[1px] border-[#1f2a39] w-full md:w-1/2 "
      style={{ height: "50vh" }}
    >
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
        <CustomDropdown
          options={DropDownOptions}
          Icon={DownIcon}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleOptionClick={handleOptionClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
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

export default BotTransaction;
