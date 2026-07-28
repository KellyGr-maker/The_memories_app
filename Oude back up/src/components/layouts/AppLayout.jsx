import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { zone } = useParams();

  const showBackButton = location.pathname !== "/";

  function goBack() {
    if (location.pathname.startsWith("/order")) {
      navigate(`/tables/${zone || "terras"}`);
      return;
    }

    if (location.pathname.startsWith("/tables")) {
      navigate("/dashboard");
      return;
    }

    if (location.pathname === "/dashboard") {
      navigate("/");
      return;
    }

    navigate(-1);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#1B1B1B",
        color: "#fff",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#111",
          borderBottom: "2px solid #D4AF37",
        }}
      >
        <Toolbar>
          {showBackButton && (
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={goBack}
              sx={{ mr: 1 }}
            >
              Terug
            </Button>
          )}

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#D4AF37",
              flexGrow: 1,
            }}
          >
            The Memories Order
          </Typography>

          <Button
            color={zone === "terras" ? "warning" : "inherit"}
            onClick={() => navigate("/tables/terras")}
          >
            🏡
          </Button>

          <Button
            color={zone === "binnen" ? "warning" : "inherit"}
            onClick={() => navigate("/tables/binnen")}
          >
            🪑
          </Button>

          <Button
            color={zone === "bar" ? "warning" : "inherit"}
            onClick={() => navigate("/tables/bar")}
          >
            🍺
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/bar")}
          >
            🧾
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={2}>{children}</Box>
    </Box>
  );
}