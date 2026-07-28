import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEmployee } from "../../context/EmployeeContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { employees, setCurrentEmployee } = useEmployee();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  function login() {
    if (!selectedEmployee) return;

    setCurrentEmployee(selectedEmployee);
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
          mb={3}
        >
          Kies je naam
        </Typography>

        <List>
          {employees.map((employee) => (
            <ListItemButton
              key={employee.id}
              selected={selectedEmployee?.id === employee.id}
              onClick={() => setSelectedEmployee(employee)}
              sx={{
                mb: 1,
                borderRadius: 2,
                bgcolor:
                  selectedEmployee?.id === employee.id
                    ? "#D4AF37"
                    : "#2b2b2b",
                color:
                  selectedEmployee?.id === employee.id
                    ? "#000"
                    : "#fff",
              }}
            >
              <ListItemText primary={employee.name} />
            </ListItemButton>
          ))}
        </List>

        <Button
          fullWidth
          variant="contained"
          onClick={login}
          disabled={!selectedEmployee}
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
          VERDER
        </Button>
      </Paper>
    </Box>
  );
}