import { useState } from "react";

import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AppLayout from "../../components/layouts/AppLayout";
import { useEmployee } from "../../context/EmployeeContext";

export default function SettingsPage() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployee();

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  function saveEmployee() {
    if (!name.trim()) return;

    if (editingId) {
      updateEmployee(editingId, name);
      setEditingId(null);
    } else {
      addEmployee(name);
    }

    setName("");
  }

  function editEmployee(employee) {
    setEditingId(employee.id);
    setName(employee.name);
  }

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          ⚙️ Medewerkers
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Naam medewerker"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={saveEmployee}
            >
              {editingId
                ? "Medewerker opslaan"
                : "Medewerker toevoegen"}
            </Button>
          </Stack>
        </Paper>

        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
          }}
        >
          <List>
            {employees.map((employee) => (
              <ListItem
                key={employee.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() => editEmployee(employee)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        deleteEmployee(employee.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={employee.name}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </AppLayout>
  );
}