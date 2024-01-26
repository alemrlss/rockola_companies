/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";

function SidebarItemCollapse({
  item,
  handleDrawerToggle,
  handleItemClick,
  activeItem,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        sx={{
          display: "flex",
          marginLeft: "30px",
          marginRight: "30px",
          "&:hover": {
            backgroundColor: "#8087DF",
            borderRadius: "60px",
          },
          "&:not(:hover)": {
            backgroundColor: "transparent",
            borderRadius: "40px",
          },
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="space-x-4"
        >
          <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText sx={{ color: "white", ml: 0 }} primary={item.name} />
          {open ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </Box>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {item.subItems.map((subItem, index) => (
            <Link
              to={`${item.id}/${subItem.id}`}
              key={index}
              onClick={handleDrawerToggle}
            >
              <ListItemButton
                selected={subItem.id === activeItem}
                onClick={() => handleItemClick(subItem.id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  marginLeft: "50px",
                  marginRight: "30px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#8087DF",
                    borderRadius: "60px",
                    fontWeight: "bold",
                  },
                  "&:not(:hover)": {
                    backgroundColor: "transparent",
                    borderRadius: "40px",
                    fontWeight: "bold",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#f0f0f0",
                    color: "#555CB3",
                    fontWeight: "bold",
                    borderRadius: "60px",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#555CB3",
                    fontWeight: "bold",
                    borderRadius: "60px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="space-x-4"
                >
                  <ListItemIcon
                    sx={{
                      color: subItem.id === activeItem ? "#555CB3" : "white",
                      minWidth: 0,
                    }}
                  >
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ ml: 0 }} primary={subItem.name} />
                </Box>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
