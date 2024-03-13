/* eslint-disable react/prop-types */
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector } from "react-redux";
import { formatExpirationDate } from "../../utils/formatDate";

function AppBarComponent({ drawerWidth, handleDrawerToggle }) {
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  const getMembershipType = (type) => {
    switch (type) {
      case 10:
        return { name: "Basic", icon: <StarIcon />, color: "#D3D3D3" }; // Gris claro
      case 20:
        return { name: "Vip", icon: <EmojiEventsIcon />, color: "#ADD8E6" }; // Azul claro
      case 30:
        return {
          name: "Premium",
          icon: <WorkspacePremiumIcon />,
          color: "#FFD700",
        }; // Dorado
      default:
        return { name: "Unknown", icon: <HelpOutlineIcon />, color: "#808080" }; // Gris por defecto
    }
  };

  const getTextColor = () => {
    if (user.membership && user.membership.expiration) {
      const daysUntilExpiration = calculateDaysUntilExpiration(
        user.membership.expiration
      );
      if (daysUntilExpiration <= 10) {
        return "red";
      }
    }

    return "black";
  };

  const calculateDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Milisegundos por día

    // Calcula la diferencia en días y redondea hacia abajo.
    const daysUntilExpiration = Math.floor(
      (expiration - today) / millisecondsPerDay
    );

    return daysUntilExpiration;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
            color: "black",
            borderRadius: "50px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: "flex", sm: "flex" },
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {user.membership && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "50px",
                marginLeft: "20px",
                color: "black",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: getMembershipType(user.membership.type).color,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: getTextColor(),
                  marginRight: "5px",
                  fontWeight: "bold",
                }}
              >
                {getMembershipType(user.membership.type).icon}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: getMembershipType(user.membership.type).color,
                  padding: "10px",
                  color: getTextColor(),
                  fontWeight: "bold",
                  borderRadius: "50px",
                }}
              >
                {user.membership.expiration
                  ? `Vence el: ${formatExpirationDate(
                      user.membership.expiration
                    )}`
                  : "No tienes membresía"}
              </Typography>
            </Box>
          )}

          {/* Balance Section */}
          {user.balance !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "50px",
                marginLeft: "20px",
                color: "black",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderRadius: "50px",
                }}
              >
                 {user.balance} Rockobits
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Notificaciones */}
            <IconButton
              sx={{
                marginX: { xs: "0px", sm: "10px" },
                marginLeft: { xs: "0px", sm: "50px" },
              }}
            >
              <NotificationsIcon />
            </IconButton>
            {/* Nombre y rol */}
            <Box sx={{ mr: 1, ml: 1, textAlign: "right" }}>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "black" }}
              >
                {user.name}
              </Typography>
              <Typography variant="body2" component="div" color="textSecondary">
                {user.type === 22
                  ? "Empleado"
                  : user.type === 23
                  ? "Empresa"
                  : "No Rol"}
              </Typography>
            </Box>

            {/* Avatar */}
            <Avatar
              alt="Andy Avatar"
              src="/path/to/avatar.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
