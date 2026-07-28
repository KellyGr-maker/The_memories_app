import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";

import AppLayout from "../../components/Layouts/AppLayout";
import { useEmployee } from "../../context/EmployeeContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentEmployee } = useEmployee();

  const zoneButton = {
    height: 80,
    borderRadius: 3,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "none",
    bgcolor: "#D4AF37",
    color: "#000",
  };

  const manageButton = {
    height: 60,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: "bold",
  };

  return (
    <AppLayout>
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          🍽️ The Memories
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={2}
        >
          Order App
        </Typography>

        <Paper
          sx={{
            p: 2,
            mb: 3,
            textAlign: "center",
            bgcolor: "#D4AF37",
            color: "#000",
            borderRadius: 3,
          }}
        >
          <Typography fontWeight="bold">
            👤 Ingelogd als: {currentEmployee?.name || "Geen medewerker"}
          </Typography>
        </Paper>

        <Stack spacing={2}>
          <Button
            variant="contained"
            sx={zoneButton}
            onClick={() => navigate("/tables/terras")}
          >
            🏡 Terras
          </Button>

          <Button
            variant="contained"
            sx={zoneButton}
            onClick={() => navigate("/tables/binnen")}
          >
            🪑 Binnen
          </Button>

          <Button
            variant="contained"
            sx={zoneButton}
            onClick={() => navigate("/tables/bar")}
          >
            🍺 Bar
          </Button>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="outlined"
            sx={manageButton}
            onClick={() => navigate("/products")}
          >
            📦 Producten
          </Button>

          <Button
            variant="outlined"
            sx={manageButton}
            onClick={() => navigate("/categories")}
          >
            📂 Categorieën
          </Button>

          <Button
            variant="outlined"
            sx={manageButton}
            onClick={() => navigate("/favorites")}
          >
            ⭐ Favorieten
          </Button>

          <Button
            variant="outlined"
            sx={manageButton}
            onClick={() => navigate("/settings")}
          >
            ⚙️ Instellingen
          </Button>
        </Stack>
      </Container>
    </AppLayout>
  );
}