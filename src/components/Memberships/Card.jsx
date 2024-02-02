/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function CardSubscription({ membership, onClick, setMembership }) {
  const getBenefits = () => {
    switch (membership.type) {
      case 10:
        return {
          sales: "1",
          skins: "1",
          customModePlay: false,
        };
      case 20:
        return {
          sales: "3",
          skins: "3",
          customModePlay: false,
        };
      case 30:
        return {
          sales: "5",
          skins: "5",
          customModePlay: true,
        };
      default:
        return "";
    }
  };

  return (
    <Card
      sx={{ backgroundColor: "#F66E0C", color: "white" }}
      className="h-full w-80"
    >
      <CardContent className=" mx-12">
        <div className="text-4xl flex items-center font-bold space-x-3">
          <p>
            {membership.type === 10
              ? "BASICO"
              : membership.type === 20
              ? "PLUS"
              : "PREMIUM"}
          </p>
          <EmojiEventsIcon fontSize="large" sx={{ color: "yellow" }} />{" "}
        </div>
        <p className="text-center text-sm my-2 font-mono">{membership.name}</p>
        <Typography variant="h2">
          {membership.currency === "usd" ? "$" : "$"} {membership.amount}
        </Typography>
        <Typography variant="h5">por usuario/mes facturado</Typography>
        <div className="mt-6 space-y-2 flex flex-col">
          <Typography variant="h6" className="mb-4">
            <CheckIcon sx={{ color: "green", marginRight: 2 }} />
            {getBenefits().sales}{" "}
            {getBenefits().sales === "1" ? "Cuenta" : "Cuentas"} para ventas
          </Typography>
          <Typography variant="h6" className="mb-4">
            <CheckIcon sx={{ color: "green", marginRight: 2 }} />
            {getBenefits().skins} Skins disponibles
          </Typography>
          <Typography variant="h6" className="mb-2">
            {getBenefits().customModePlay ? (
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />
            ) : (
              <ClearIcon sx={{ color: "red", marginRight: 2 }} />
            )}
            Personalizar el valor de los Créditos
          </Typography>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            marginTop: 4,
            borderRadius: 50,
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          fullWidth
          onClick={() => {
            setMembership(membership);
            onClick();
          }}
        >
          Obtener
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardSubscription;
