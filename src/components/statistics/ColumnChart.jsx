import ReactApexChart from "react-apexcharts";

export default function ColumnChart() {
  const options = {
    chart: {
      type: "bar",
    //   height: '100%', 
    //   width: '100%', 
      toolbar: {
        show: false,
      },
    },
    // colors:['#F44336', '#E91E63', '#9C27B0'],
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
        color: '#FFFFFF',
      }
     
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
            colors: '#ffffff'
        }
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
          colors: 'white'
        }
      }
    },
    yaxis: {
        // title: {
        //   text: "$ (thousands)",
        //   style: {
        //     color: '#ffffff' // Set y-axis title text color to white
        //   }
        // },
        labels: {
          style: {
            colors: '#ffffff' // Set y-axis series text color to white
          }
        }
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
  };

  const series = [
    {
      name: "Trade Buy",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 55],
    },
    {
      name: "Trade Sell",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 88, 67],
    },

  ];

  return (
    <div className="bg-[#141f2f] rounded-xl border-[1px] border-[#1f2a39] mb-3" style={{ height: "50vh", width: "100%" }}>
      {/* Set the height of the container div to half of the viewport height (50vh) and full width */}
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
