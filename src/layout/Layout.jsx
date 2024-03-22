import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";
import Header from "../pages/Header";
import Navigation from "../pages/Navigation";
import Icon1 from "../assets/Icon (2).svg?react";
import Icon2 from "../assets/Icon (3).svg?react";
import Icon3 from "../assets/Icon (4).svg?react";
import Icon4 from "../assets/Icon (5).svg?react";
// import Icon5 from "../assets/Icon (6).svg?react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tableHeading, setTableHeading] = useState("");




  const lists = [
    { icon: <Icon1 />, text: "Admin", route: "" },
    { icon: <Icon2 />, text: "Statistics", route: "statistics" },
    { icon: <Icon3 />, text: "Message", route: "message" },
    { icon: <Icon4 />, text: "BOT CMS", route: "bot" },
    // { icon: <Icon5 />, text: "Logout", route: "logout", },
  ];

  return (
    <div className="flex w-full fixed top-0">
      <div
        className={`z-10 w-[250px] bg-[#0f1c35] h-screen drop-shadow-md duration-300 lg:relative absolute ${
          sidebarOpen ? "left-0" : "-left-[260px] lg:left-0"
        } `}
        onClick={() => setSidebarOpen(false)}
      >
        <Navigation
          lists={lists}
          setTableHeading={setTableHeading}
          tableHeading={tableHeading}
        />
      </div>
      <div className={`w-full ${sidebarOpen && "blur-sm lg:blur-0 "}`}>
        <div className="bg-[#0f1c34] relative z-0">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            tableHeading={tableHeading}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-40px)] bg-[#141c29]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
