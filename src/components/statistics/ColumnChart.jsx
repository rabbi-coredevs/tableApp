import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getApiCall } from "../../utils/apiCaller";
import DownIcon from "../../assets/Vector.svg?react";
import CustomDropdown from "../CustomDropDown";
import LoadingIcon from '../../assets/Loading.svg?react';

export default function ColumnChart() {
  const [series, setSeries] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Day"); // Initialize with "Day"
  const [isOpen, setIsOpen] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [isloading, setIsLoading] = useState(true);

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "16px",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        color: "#FFFFFF",
      },
    },

    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
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
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff", // Set y-axis series text color to white
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " K";
        },
      },
    },

    title: {
      text: "Trade Amounts",
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
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#ffffff",
      },
    },
    grid: {
      borderColor: "#5f6769", // Set grid border color
    },
  });

  useEffect(() => {
    handleOptionClick("Day", "day"); // Simulate click on "Day" to populate chart initially
  }, [tradeData]);

  const handleOptionClick = (value, key) => {
    setSelectedOption(value);

    // Define variables for x-axis categories and series data
    let categories = [];
    // let data = [];

    // Check the selected option and set categories and data accordingly
    switch (key) {
      case "day":
        categories = Array.from({ length: 31 }, (_, index) => index + 1);

        // eslint-disable-next-line no-case-declarations
        const daySeries = [
          {
            name: "Trade Buy",
            data: tradeData?.days?.[0]?.tradeBuy || [],
          },
          {
            name: "Trade Sell",
            data: tradeData?.days?.[1]?.tradeSell || [],
          },
        ];
        setSeries(daySeries);
        break;

      case "week":
        categories = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
        // eslint-disable-next-line no-case-declarations
        const weekSeries = [
          {
            name: "Trade Buy",
            data: [53, 78, 29, 91, 42, 67, 14],
          },
          {
            name: "Trade Sell",
            data: [91, 22, 57, 84, 39, 66, 12],
          },
        ];
        setSeries(weekSeries);

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
        // eslint-disable-next-line no-case-declarations
        const monthSeries = [
          {
            name: "Trade Buy",
            data: tradeData?.months?.[0]?.tradeBuy || [],
          },
          {
            name: "Trade Sell",
            data: tradeData?.months?.[1]?.tradeSell || [],
          },
        ];
        setSeries(monthSeries);
        break;

      case "year":
        categories = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        // eslint-disable-next-line no-case-declarations
        const yearSeries = [
          {
            name: "Trade Buy",
            data: tradeData?.months?.[0]?.tradeBuy || [],
          },
          {
            name: "Trade Sell",
            data: tradeData?.months?.[1]?.tradeSell || [],
          },
        ];
        setSeries(yearSeries);

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
  };

  useEffect(() => {
    getApiCall(`/statistics/trade-amount?tradeData=tradeAmounts`)
      .then((res) => {
        // console.log(res.data[0].tradeAmounts);
        setTradeData(res.data[0].tradeAmounts[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


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

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon />
      </div>
    );
  }
  
  return (
    <div
      className="bg-[#141f2f] rounded-xl border-[1px] border-[#1f2a39] mb-3 relative"
      style={{ height: "50vh", width: "100%" }}
    >
      {/* Set the height of the container div to half of the viewport height (50vh) and full width */}
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
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="100%" // Set chart height to 100% of its container
        width="100%" // Set chart width to 100% of its container
      />
    </div>
  );
}
