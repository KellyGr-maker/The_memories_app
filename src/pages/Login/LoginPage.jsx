import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  function login() {
    navigate("/dashboard");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: 4,
          borderRadius: 4,
          bgcolor: "#1f1f1f",
          border: "2px solid #D4AF37",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="#D4AF37"
        >
          The Memories
        </Typography>

        <Typography
          align="center"
          color="gray"
          mb={4}
        >
          ORDER
        </Typography>

        <TextField
          label="Gebruikersnaam"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Wachtwoord"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={login}
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#c69d2d",
            },
          }}
        >
          INLOGGEN
        </Button>
      </Paper>
    </Box>
  );
}