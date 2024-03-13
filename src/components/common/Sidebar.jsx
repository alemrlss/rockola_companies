/* eslint-disable react/prop-types */
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import SidebarItemLogout from "./SidebarItemLogout";
import { useState } from "react";

function Sidebar({ handleDrawerToggle }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const handleItemClick = (itemId) => {
    console.log(itemId);
    setActiveItem(itemId);
    handleDrawerToggle();
  };

  const menuItems = [
    {
      id: "dashboard",
      translationKey: "menu_dashboard",
      name: "Dashboard",
      icon: <DashboardIcon />,
      subItems: null,
    },

    {
      id: "owner",
      translationKey: "menu_payments",
      name: "Owner",
      icon: <MonetizationOnIcon />,
      subItems: null,
    },
    {
      id: "employees",
      translationKey: "menu_employees",
      name: "Employees",
      icon: <PeopleIcon />,
      subItems: [
        {
          id: "create",
          translationKey: "menu_create",
          name: "Create",
          icon: <SupervisorAccountIcon />,
        },
        {
          id: "list",
          translationKey: "menu_list",
          name: "List",
          icon: <SupervisorAccountIcon />,
        },
        {
          id: "transfer",
          translationKey: "menu_transfer",
          name: "Transfer",
          icon: <SupervisorAccountIcon />,
        },
      ],
    },
    {
      id: "subscriptions",
      translationKey: "menu_help",
      name: "Subscriptions",
      icon: <HelpOutlineIcon />,
      subItems: [
        {
          id: "get",
          translationKey: "menu_companies",
          name: "Get",
          icon: <BusinessIcon />,
        },
        {
          id: "cancel",
          translationKey: "menu_clients",
          name: "Cancel",
          icon: <PersonIcon />,
        },
      ],
    },
    {
      id: "screens",
      translationKey: "menu_screens",
      name: "Screens",
      icon: <HelpOutlineIcon />,
      subItems: null,
    },
    {
      id: "rockobits",
      translationKey: "menu_rockobits",
      name: "Rockobits",
      icon: <HelpOutlineIcon />,
      subItems: [
        {
          id: "buy",
          translationKey: "menu_buy",
          name: "Buy",
          icon: <SupervisorAccountIcon />,
        },
        {
          id: "sale",
          translationKey: "menu_sale",
          name: "Sale",
          icon: <SupervisorAccountIcon />,
        }
      ],
    },
  ];

  return (
    <div className="bg-[#555CB3] overflow-y-auto h-full flex flex-col">
      <div className="flex mx-8 justify-center items-center space-x-2 my-8">
        <h2
          style={{ textShadow: "2px 2px 1px #B45946", color: "white" }}
          className="font-semibold text-white text-xl tracking-widest text-shadow-lg"
        >
          PSROCKOLA
        </h2>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) =>
          item.subItems ? (
            <SidebarItemCollapse
              item={item}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
              handleItemClick={handleItemClick}
              activeItem={activeItem}
            />
          ) : (
            <SidebarItem
              item={item}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
              handleItemClick={handleItemClick}
              activeItem={activeItem}
            />
          )
        )}
      </List>
      <div className="mt-auto mb-5">
        <SidebarItemLogout
          item={{
            id: "logout",
            translationKey: "menu_logout",
            icon: <LogoutIcon />,
            subItems: null,
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
